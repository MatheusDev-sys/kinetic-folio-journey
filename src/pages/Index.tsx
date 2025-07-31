import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import ScrollPath from '@/components/ScrollPath';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Uma plataforma de e-commerce moderna com React, Node.js e MongoDB. Sistema completo de carrinho, pagamentos e gestão de produtos.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder-project1.jpg",
      link: "https://github.com/example/ecommerce"
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interativo para análise de dados com gráficos dinâmicos e relatórios em tempo real usando D3.js e Chart.js.",
      tech: ["Vue.js", "D3.js", "Chart.js", "Firebase"],
      image: "/placeholder-project2.jpg",
      link: "https://github.com/example/dashboard"
    },
    {
      title: "Mobile App Social",
      description: "Aplicativo móvel social com chat em tempo real, compartilhamento de mídia e sistema de notificações push.",
      tech: ["React Native", "Socket.io", "AWS", "Redux"],
      image: "/placeholder-project3.jpg",
      link: "https://github.com/example/social-app"
    },
    {
      title: "AI Chat Bot",
      description: "Chatbot inteligente usando processamento de linguagem natural para atendimento ao cliente automatizado.",
      tech: ["Python", "TensorFlow", "Flask", "NLP"],
      image: "/placeholder-project4.jpg",
      link: "https://github.com/example/chatbot"
    },
    {
      title: "Portfolio 3D",
      description: "Site portfólio interativo com animações 3D, physics e experiências imersivas usando Three.js.",
      tech: ["Three.js", "GSAP", "WebGL", "Blender"],
      image: "/placeholder-project5.jpg",
      link: "https://github.com/example/portfolio-3d"
    }
  ];

  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger on component mount
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <ScrollPath />
      
      <HeroSection />
      
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Meus Projetos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada projeto representa uma jornada única de aprendizado e criação
            </p>
          </div>
          
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`flex justify-center ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <ProjectCard {...project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="py-16 text-center relative z-10">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold gradient-text mb-4">
            Vamos Conectar?
          </h3>
          <p className="text-muted-foreground mb-8">
            Sempre aberto para novos projetos e colaborações
          </p>
          <div className="flex justify-center space-x-6">
            {['GitHub', 'LinkedIn', 'Email'].map((platform) => (
              <button
                key={platform}
                className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
