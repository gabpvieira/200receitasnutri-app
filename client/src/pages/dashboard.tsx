import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Modal, ContentModal, PdfModal, PdfViewerModal } from '@/components/modal';
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
  CheckCircle,
  Leaf,
  Coffee,
  Star,
  FileText,
  Calendar,
  ShoppingCart,
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react';

export default function Dashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('inicio');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [pdfViewer, setPdfViewer] = useState<{ title: string; previewUrl: string } | null>(null);
  const { toast, showToast, hideToast } = useToast();

  // Listen for PDF viewer events
  useEffect(() => {
    const handleOpenPdfViewer = (event: CustomEvent) => {
      setPdfViewer(event.detail);
    };

    window.addEventListener('openPdfViewer', handleOpenPdfViewer as EventListener);
    return () => {
      window.removeEventListener('openPdfViewer', handleOpenPdfViewer as EventListener);
    };
  }, []);

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
          <section className="py-6">
            <div className="text-center mb-8 animate-fade-in">
              <div className="w-16 h-16 mx-auto gradient-btn-primary rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Bem-vindo(a){user?.name ? `, ${user.name}` : ''} 👋
              </h2>
              <p className="text-muted-foreground text-lg mb-2">
                Sua jornada saudável começa aqui!
              </p>
              <p className="text-sm text-muted-foreground">
                Acesse seu cardápio, bônus e suporte.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="professional-card rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-success-light rounded-lg flex items-center justify-center mb-2">
                  <Coffee className="w-6 h-6 text-success" />
                </div>
                <div className="text-2xl font-bold text-success mb-1" data-testid="text-recipes-count">200+</div>
                <div className="text-sm text-muted-foreground">Receitas</div>
              </div>
              <div className="professional-card rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-warning-light rounded-lg flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-1" data-testid="text-bonus-count">3</div>
                <div className="text-sm text-muted-foreground">Bônus Exclusivos</div>
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="space-y-4">
              <div 
                className="professional-card rounded-xl p-4 cursor-pointer transition-all duration-200" 
                onClick={() => setActiveTab('cardapio')}
                data-testid="card-cardapio-quick-access"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-btn-primary rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Cardápio Principal</h3>
                    <p className="text-sm text-muted-foreground">200 receitas de café da manhã</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div 
                className="professional-card rounded-xl p-4 cursor-pointer transition-all duration-200" 
                onClick={() => setActiveTab('bonus')}
                data-testid="card-bonus-quick-access"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-btn-accent rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Bônus Exclusivos</h3>
                    <p className="text-sm text-muted-foreground">3 materiais complementares</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </section>
        );

      case 'cardapio':
        return (
          <section className="py-6">
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-btn-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground" data-testid="text-cardapio-title">Cardápio Principal</h2>
              </div>
              
              <div className="professional-card rounded-2xl p-6 mb-6">
                <img 
                  src="https://i.postimg.cc/yNNMc9LX/capam-ockup.jpg" 
                  alt="Mockup do Cardápio Completo" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  data-testid="img-cardapio-mockup"
                />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    200 Receitas Rápidas de Café da Manhã
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    O material principal com 200 receitas práticas, saborosas e saudáveis para transformar suas manhãs.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="status-badge-available px-3 py-1 rounded-full font-medium">200 Receitas</span>
                    <span className="status-badge-available px-3 py-1 rounded-full font-medium">PDF Premium</span>
                    <span className="status-badge-available px-3 py-1 rounded-full font-medium">Práticas</span>
                  </div>
                  <button 
                    onClick={() => setActiveModal('cardapio-modal')}
                    className="w-full gradient-btn-primary text-white font-semibold py-3 rounded-xl mt-4"
                    data-testid="button-view-cardapio"
                  >
                    Acessar Cardápio Completo
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'bonus':
        return (
          <section className="py-6">
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 gradient-btn-accent rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground" data-testid="text-bonus-title">Bônus Exclusivos</h2>
              </div>
              <p className="text-muted-foreground mb-6">Materiais complementares para potencializar seus resultados</p>
              
              <div className="space-y-4">
                {/* Bônus 1 */}
                <div className="professional-card rounded-xl p-4" data-testid="card-bonus-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 gradient-btn-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">Guia de Lanches Saudáveis</h3>
                        <span className="status-badge-available text-xs px-2 py-1 rounded-full font-medium">Disponível</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Receitas rápidas e práticas para seus intervalos.</p>
                      <button 
                        onClick={() => setActiveModal('bonus1-modal')}
                        className="text-success font-medium text-sm hover:text-success/80 transition-colors duration-200"
                        data-testid="button-view-bonus-1"
                      >
                        Acessar Material →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bônus 2 */}
                <div className="professional-card rounded-xl p-4 opacity-60" data-testid="card-bonus-2">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">Cardápio Semanal Planejado</h3>
                        <span className="status-badge-pending text-xs px-2 py-1 rounded-full font-medium">🕒 24h</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Plano de 7 dias para organizar suas refeições.</p>
                      <button 
                        onClick={() => setActiveModal('bonus2-modal')}
                        className="text-muted-foreground font-medium text-sm cursor-not-allowed"
                        data-testid="button-view-bonus-2"
                      >
                        Em breve →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bônus 3 */}
                <div className="professional-card rounded-xl p-4 opacity-60" data-testid="card-bonus-3">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">Lista de Compras Inteligente</h3>
                        <span className="status-badge-pending text-xs px-2 py-1 rounded-full font-medium">🕒 24h</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Facilite sua vida no mercado comprando só o essencial.</p>
                      <button 
                        onClick={() => setActiveModal('bonus3-modal')}
                        className="text-muted-foreground font-medium text-sm cursor-not-allowed"
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
          <section className="py-6">
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-btn-primary rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground" data-testid="text-plano-title">Plano Individualizado</h2>
              </div>
              
              <div className="professional-card rounded-2xl p-6 text-center">
                <div className="w-20 h-20 mx-auto gradient-btn-accent rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Cronograma Personalizado de 30 Dias
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Quer um cronograma personalizado de 30 dias, feito sob medida para o seu objetivo? 
                  Clique abaixo e fale com a Nutri pelo WhatsApp.
                </p>
                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>Avaliação personalizada</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>Cronograma de 30 dias</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>Acompanhamento profissional</span>
                  </div>
                </div>
                <a 
                  href="https://wa.me/5584999389121" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gradient-btn-accent text-white font-semibold py-3 px-6 rounded-xl"
                  data-testid="link-whatsapp-plan"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Solicitar Plano no WhatsApp
                </a>
              </div>
            </div>
          </section>
        );

      case 'suporte':
        return (
          <section className="py-6">
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-btn-primary rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground" data-testid="text-suporte-title">Suporte</h2>
              </div>
              
              <div className="professional-card rounded-2xl p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Precisa de Ajuda?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nosso time está pronto para te atender. Entre em contato pelo WhatsApp para qualquer dúvida ou suporte técnico.
                </p>
                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Atendimento rápido</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Suporte técnico especializado</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Resolução garantida</span>
                  </div>
                </div>
                <a 
                  href="https://wa.me/5584999389121" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gradient-btn-accent text-white font-semibold py-3 px-6 rounded-xl"
                  data-testid="link-whatsapp-support"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
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
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="professional-card border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-btn-primary rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground" data-testid="text-app-title">Cardápio da Nutri</h1>
                <p className="text-xs text-muted-foreground">Área Premium</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              title="Sair"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 px-4">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 professional-card border-t z-50">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive ? 'tab-active' : 'text-muted-foreground'
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

      {/* PDF Viewer Modal */}
      {pdfViewer && (
        <PdfViewerModal
          title={pdfViewer.title}
          previewUrl={pdfViewer.previewUrl}
          onClose={() => setPdfViewer(null)}
        />
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
