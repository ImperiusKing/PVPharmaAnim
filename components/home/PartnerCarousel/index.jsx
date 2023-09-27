import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from './partnerCarousel.module.css';
import Autoplay from 'embla-carousel-autoplay';

export const PartnerCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay(),
  ]);

  return (
    <div className='embla w-full' ref={emblaRef}>
      <div className='embla__container flex items-center justify-between gap-6 h-30'>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/bulb.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/pharmacity.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/phuongchinh.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/ankhang.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/bulb.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/pharmacity.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/phuongchinh.png' />
        </div>
        <div className={styles.emblaSlide}>
          <Image width={175} height={50} src='/partners/ankhang.png' />
        </div>
      </div>
    </div>
  );
};
