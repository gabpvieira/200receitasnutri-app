import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Modal, ContentModal, PdfModal } from '@/components/modal';
import { Toast, useToast } from '@/components/toast';
import { 
  Home, 
  BookOpen, 
  Gift, 
  User, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Check,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react';

export default function Dashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('inicio');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();

  // Content data with Google Drive links
  const contentData = {
    cardapio: {
      title: 'Cardápio Completo',
      description: 'Acesse agora seu cardápio completo em PDF com 200 receitas exclusivas.',
      icon: '📖',
      previewUrl: 'https://drive.google.com/file/d/19iXTxKCUfBZ_n8kvfMD4_QC7_4CUSbmS/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=19iXTxKCUfBZ_n8kvfMD4_QC7_4CUSbmS',
      isAvailable: true
    },
    bonus1: {
      title: 'Guia de Lanches Saudáveis',
      description: 'Acesse agora seu guia completo com receitas rápidas e práticas para seus intervalos.',
      icon: '🥪',
      previewUrl: 'https://drive.google.com/file/d/1fIIuk_8Jzpsrg-wYcEHsd2729rDvPJrG/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1fIIuk_8Jzpsrg-wYcEHsd2729rDvPJrG',
      isAvailable: true
    },
    bonus2: {
      title: 'Cardápio Semanal Planejado',
      description: 'Organize suas refeições com nosso plano de 7 dias estruturado e balanceado.',
      icon: '📅',
      isAvailable: false
    },
    bonus3: {
      title: 'Lista de Compras Inteligente',
      description: 'Facilite sua vida no mercado com nossa lista otimizada para comprar apenas o essencial.',
      icon: '🛒',
      isAvailable: false
    }
  };

  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'cardapio', label: 'Cardápio', icon: BookOpen },
    { id: 'bonus', label: 'Bônus', icon: Gift },
    { id: 'plano', label: 'Plano', icon: User },
    { id: 'suporte', label: 'Suporte', icon: HelpCircle },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <section className="p-6">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-3">
                Bem-vindo(a){user?.name ? `, ${user.name}` : ''} ao Cardápio da Nutri 🎉
              </h2>
              <p className="text-gray-300 text-lg">
                Aqui você acessa seu cardápio, bônus e suporte.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary-500 mb-1" data-testid="text-recipes-count">200+</div>
                <div className="text-sm text-gray-400">Receitas</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-1" data-testid="text-bonus-count">3</div>
                <div className="text-sm text-gray-400">Bônus Exclusivos</div>
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="space-y-4">
              <div 
                className="glass-card rounded-xl p-4 cursor-pointer hover:bg-opacity-10 transition-all duration-300" 
                onClick={() => setActiveTab('cardapio')}
                data-testid="card-cardapio-quick-access"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📖</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Cardápio Principal</h3>
                    <p className="text-sm text-gray-400">200 receitas de café da manhã</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div 
                className="glass-card rounded-xl p-4 cursor-pointer hover:bg-opacity-10 transition-all duration-300" 
                onClick={() => setActiveTab('bonus')}
                data-testid="card-bonus-quick-access"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎁</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Bônus Exclusivos</h3>
                    <p className="text-sm text-gray-400">3 materiais complementares</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </section>
        );

      case 'cardapio':
        return (
          <section className="p-6">
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-cardapio-title">Cardápio Principal</h2>
              
              <div className="glass-card rounded-2xl p-6 mb-6">
                <img 
                  src="https://nucleosaudavel.com/wp-content/uploads/2025/08/mockup.webp" 
                  alt="Mockup do Cardápio Completo" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  data-testid="img-cardapio-mockup"
                />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Cardápio Completo – 200 Receitas de Café da Manhã
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    O material principal com 200 receitas práticas, saborosas e saudáveis para transformar suas manhãs.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1 bg-primary-500 bg-opacity-20 text-primary-400 rounded-full">200 Receitas</span>
                    <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-full">PDF Premium</span>
                    <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full">Práticas</span>
                  </div>
                  <button 
                    onClick={() => setActiveModal('cardapio-modal')}
                    className="w-full gradient-btn text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                    data-testid="button-view-cardapio"
                  >
                    Ver Cardápio Completo
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'bonus':
        return (
          <section className="p-6">
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-white mb-2" data-testid="text-bonus-title">Bônus Exclusivos</h2>
              <p className="text-gray-400 mb-6">Materiais complementares para potencializar seus resultados</p>
              
              <div className="space-y-4">
                {/* Bônus 1 */}
                <div className="glass-card rounded-xl p-4" data-testid="card-bonus-1">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://nucleosaudavel.com/wp-content/uploads/2025/08/bonus1.webp" 
                      alt="Guia de Lanches Saudáveis" 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">Guia de Lanches Saudáveis</h3>
                      <p className="text-sm text-gray-400 mb-3">Receitas rápidas e práticas para seus intervalos.</p>
                      <button 
                        onClick={() => setActiveModal('bonus1-modal')}
                        className="text-primary-400 font-medium text-sm hover:text-primary-300 transition-colors duration-200"
                        data-testid="button-view-bonus-1"
                      >
                        Ver Bônus →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bônus 2 */}
                <div className="glass-card rounded-xl p-4 opacity-60" data-testid="card-bonus-2">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://nucleosaudavel.com/wp-content/uploads/2025/08/bonus2.webp" 
                      alt="Cardápio Semanal Planejado" 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">Cardápio Semanal Planejado</h3>
                        <span className="text-xs bg-yellow-500 bg-opacity-20 text-yellow-400 px-2 py-1 rounded-full">🕒 24h</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Plano de 7 dias para organizar suas refeições.</p>
                      <button 
                        onClick={() => setActiveModal('bonus2-modal')}
                        className="text-gray-500 font-medium text-sm cursor-not-allowed"
                        data-testid="button-view-bonus-2"
                      >
                        Em breve →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bônus 3 */}
                <div className="glass-card rounded-xl p-4 opacity-60" data-testid="card-bonus-3">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://nucleosaudavel.com/wp-content/uploads/2025/08/bonus3.webp" 
                      alt="Lista de Compras Inteligente" 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">Lista de Compras Inteligente</h3>
                        <span className="text-xs bg-yellow-500 bg-opacity-20 text-yellow-400 px-2 py-1 rounded-full">🕒 24h</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Facilite sua vida no mercado comprando só o essencial.</p>
                      <button 
                        onClick={() => setActiveModal('bonus3-modal')}
                        className="text-gray-500 font-medium text-sm cursor-not-allowed"
                        data-testid="button-view-bonus-3"
                      >
                        Em breve →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'plano':
        return (
          <section className="p-6">
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-plano-title">Plano Individualizado</h2>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">👩‍⚕️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Cronograma Personalizado de 30 Dias
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Quer um cronograma personalizado de 30 dias, feito sob medida para o seu objetivo? 
                  Clique abaixo e fale com a Nutri pelo WhatsApp.
                </p>
                <div className="space-y-3 mb-6 text-sm text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-primary-500" />
                    <span>Avaliação personalizada</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-primary-500" />
                    <span>Cronograma de 30 dias</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-primary-500" />
                    <span>Acompanhamento profissional</span>
                  </div>
                </div>
                <a 
                  href="https://wa.me/5584999389121" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gradient-btn text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="link-whatsapp-plan"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
                  </svg>
                  Solicitar Plano no WhatsApp
                </a>
              </div>
            </div>
          </section>
        );

      case 'suporte':
        return (
          <section className="p-6">
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-suporte-title">Suporte</h2>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Precisa de Ajuda?
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Nosso time está pronto para te atender. Entre em contato pelo WhatsApp para qualquer dúvida ou suporte técnico.
                </p>
                <div className="space-y-3 mb-6 text-sm text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Atendimento rápido</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Suporte técnico especializado</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Resolução garantida</span>
                  </div>
                </div>
                <a 
                  href="https://wa.me/5584999389121" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gradient-btn text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="link-whatsapp-support"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-400">
      {/* Header */}
      <header className="glass-card border-b border-gray-800 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">🥗</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white" data-testid="text-app-title">Cardápio da Nutri</h1>
                <p className="text-xs text-gray-400">Área Premium</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              title="Sair"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-gray-800 z-50">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive ? 'tab-active' : 'text-gray-400'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modals */}
      <Modal isOpen={activeModal === 'cardapio-modal'} onClose={() => setActiveModal(null)}>
        <PdfModal
          title={contentData.cardapio.title}
          description={contentData.cardapio.description}
          icon={contentData.cardapio.icon}
          previewUrl={contentData.cardapio.previewUrl}
          downloadUrl={contentData.cardapio.downloadUrl}
          isAvailable={contentData.cardapio.isAvailable}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <Modal isOpen={activeModal === 'bonus1-modal'} onClose={() => setActiveModal(null)}>
        <PdfModal
          title={contentData.bonus1.title}
          description={contentData.bonus1.description}
          icon={contentData.bonus1.icon}
          previewUrl={contentData.bonus1.previewUrl}
          downloadUrl={contentData.bonus1.downloadUrl}
          isAvailable={contentData.bonus1.isAvailable}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <Modal isOpen={activeModal === 'bonus2-modal'} onClose={() => setActiveModal(null)}>
        <PdfModal
          title={contentData.bonus2.title}
          description={contentData.bonus2.description}
          icon={contentData.bonus2.icon}
          isAvailable={contentData.bonus2.isAvailable}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <Modal isOpen={activeModal === 'bonus3-modal'} onClose={() => setActiveModal(null)}>
        <PdfModal
          title={contentData.bonus3.title}
          description={contentData.bonus3.description}
          icon={contentData.bonus3.icon}
          isAvailable={contentData.bonus3.isAvailable}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      {/* Toast */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
