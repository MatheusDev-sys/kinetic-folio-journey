import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero entrance animation
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }

    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");
    }

    if (buttonRef.current) {
      tl.from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.3");
    }

    // Parallax effect on scroll
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-primary/10 rounded-full floating-element" />
      <div className="absolute top-40 right-32 w-16 h-16 bg-accent/10 rounded-full floating-element" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/10 rounded-full floating-element" style={{animationDelay: '4s'}} />
      
      <div className="container mx-auto px-4 text-center z-10">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
        >
          Portfólio
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Uma jornada interativa através dos meus projetos. 
          Role para explorar o caminho criativo.
        </p>
        
        <div ref={buttonRef}>
          <Button 
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
          >
            Iniciar Jornada
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;