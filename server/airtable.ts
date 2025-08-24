import Airtable from 'airtable';

// Configure Airtable with fallback values
const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN || 'demo_token';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'demo_base';

let base: any = null;

try {
  if (AIRTABLE_ACCESS_TOKEN !== 'demo_token' && AIRTABLE_BASE_ID !== 'demo_base') {
    base = new Airtable({
      apiKey: AIRTABLE_ACCESS_TOKEN
    }).base(AIRTABLE_BASE_ID);
  }
} catch (error) {
  console.warn('Airtable configuration not available, running in demo mode');
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    if (!base) {
      console.error('Airtable base not configured');
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
      name: record.get('Nome') as string,
      email: record.get('Email') as string,
      password: record.get('Senha') as string
    };
  } catch (error) {
    console.error('Airtable authentication error:', error);
    return null;
  }
}