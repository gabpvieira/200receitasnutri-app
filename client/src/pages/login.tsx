import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Toast, useToast } from '@/components/toast';
import { Leaf, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    
    if (success) {
      showToast('Login realizado com sucesso!');
    } else if (error) {
      showToast(error);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto gradient-btn-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">MANUAL DA NUTRI:</h1>
          <h2 className="text-xl font-semibold text-white mb-2">200 RECEITAS RÁPIDAS DE CAFÉ DA MANHÃ</h2>
          <p className="text-white/80">Área Premium de Membros</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="professional-card rounded-2xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                  data-testid="input-password"
                />
              </div>
            </div>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                <p className="text-destructive text-sm text-center">{error}</p>
              </div>
            )}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full gradient-btn-primary text-white font-semibold py-3 rounded-xl disabled:opacity-50"
              data-testid="button-login"
            >
              {isLoading ? (
                <span>Verificando<span className="loading-dots"></span></span>
              ) : (
                <span>Entrar na Área Premium</span>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-white/70 text-sm mt-6">
          Acesso exclusivo para membros premium
        </p>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
