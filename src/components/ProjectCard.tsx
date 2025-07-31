import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  index: number;
}

const ProjectCard = ({ title, description, tech, image, link, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const isEven = index % 2 === 0;

    // Set initial state
    gsap.set(card, {
      x: isEven ? -100 : 100,
      opacity: 0,
      scale: 0.8,
    });

    // Animate card entrance
    gsap.to(card, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Parallax effect for image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [index]);

  return (
    <Card 
      ref={cardRef}
      className="project-card p-6 max-w-md mx-auto relative overflow-hidden group"
    >
      <div 
        ref={imageRef}
        className="w-full h-48 bg-gradient-primary rounded-lg mb-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl font-bold opacity-50">
          {index + 1}
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold gradient-text">{title}</h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((item, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
            >
              {item}
            </span>
          ))}
        </div>
        
        <Button 
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          onClick={() => window.open(link, '_blank')}
        >
          Ver Projeto
        </Button>
      </div>
    </Card>
  );
};

export default ProjectCard;