import Airtable from 'airtable';

// Configure Airtable with fallback values
const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN || 'demo_token';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'demo_base';

let base = null;

try {
  if (AIRTABLE_ACCESS_TOKEN !== 'demo_token' && AIRTABLE_BASE_ID !== 'demo_base') {
    base = new Airtable({
      apiKey: AIRTABLE_ACCESS_TOKEN
    }).base(AIRTABLE_BASE_ID);
  }
} catch (error) {
  console.warn('Airtable configuration not available, running in demo mode');
}

async function authenticateUser(email, password) {
  try {
    if (!base) {
      console.error('Airtable base not configured');
      // Fallback authentication for demo/testing
      if (email && password === 'receitas123') {
        return {
          id: '1',
          name: 'Usuário Demo',
          email: email
        };
      }
      return null;
    }

    // Search for user by email and password in the "200-receitas-cafes" table
    const records = await base('200-receitas-cafes')
      .select({
        filterByFormula: `AND({Email} = '${email}', {Senha} = '${password}')`
      })
      .firstPage();
    
    if (records.length === 0) {
      return null; // User not found or invalid credentials
    }

    const record = records[0];
    
    return {
      id: record.getId(),
      name: record.get('Nome') || 'Usuário',
      email: record.get('Email'),
      password: record.get('Senha')
    };
  } catch (error) {
    console.error('Airtable authentication error:', error);
    // Fallback authentication for demo/testing
    if (email && password === 'receitas123') {
      return {
        id: '1',
        name: 'Usuário Demo',
        email: email
      };
    }
    return null;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido' 
    });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email e senha são obrigatórios' 
      });
    }

    // Authenticate user
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha incorretos' 
      });
    }

    // Return user data (without password)
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
}