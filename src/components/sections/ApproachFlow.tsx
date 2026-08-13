import { approach } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { StageFlow } from '../interactive/StageFlow';

export function ApproachFlow() {
  return (
    <section id="approach" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={approach.index}
          label={approach.label}
          lines={approach.headline}
          lede={approach.lede}
        />

        <Reveal className="mt-16 sm:mt-20" y={22}>
          <StageFlow />
        </Reveal>
      </div>
    </section>
  );
}
