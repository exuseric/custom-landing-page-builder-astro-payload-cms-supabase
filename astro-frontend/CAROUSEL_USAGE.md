# Carousel Component Usage Guide

The `Carousel` and `CarouselItem` components are flexible and can be used for various content types. Below are examples for common use cases:

---

## 1. Testimonial Carousel

Display customer testimonials in a sliding format.

```astro
<Carousel autoplay={true} showIndicators={true} showNavigation={true}>
  <CarouselItem>
    <blockquote>
      <p>"Great service and support!"</p>
      <footer>- Jane Doe</footer>
    </blockquote>
  </CarouselItem>
  <CarouselItem>
    <blockquote>
      <p>"Highly recommend this company."</p>
      <footer>- John Smith</footer>
    </blockquote>
  </CarouselItem>
</Carousel>
```

---

## 2. Hero Carousel

Showcase multiple hero banners or promotional slides.

```astro
<Carousel autoplay={true} infinite={true} showIndicators={false}>
  <CarouselItem>
    <section class="hero">
      <h1>Welcome to Our Site</h1>
      <p>Discover amazing products.</p>
    </section>
  </CarouselItem>
  <CarouselItem>
    <section class="hero">
      <h1>Summer Sale</h1>
      <p>Up to 50% off selected items!</p>
    </section>
  </CarouselItem>
</Carousel>
```

---

## 3. Gallery Carousel

Display a set of images as a gallery.

```astro
<Carousel autoplay={false} showNavigation={true}>
  <CarouselItem>
    <img src="/images/photo1.jpg" alt="Photo 1" />
  </CarouselItem>
  <CarouselItem>
    <img src="/images/photo2.jpg" alt="Photo 2" />
  </CarouselItem>
  <CarouselItem>
    <img src="/images/photo3.jpg" alt="Photo 3" />
  </CarouselItem>
</Carousel>
```

---

## 4. Our Teams Carousel

Show team members in a carousel format.

```astro
<Carousel breakpoints={{480: 1, 768: 2, 1024: 4}} showIndicators={true}>
  <CarouselItem>
    <div class="team-card">
      <img src="/team/alex.jpg" alt="Alex" />
      <h3>Alex</h3>
      <p>Lead Developer</p>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div class="team-card">
      <img src="/team/sam.jpg" alt="Sam" />
      <h3>Sam</h3>
      <p>Designer</p>
    </div>
  </CarouselItem>
  <!-- Add more team members as needed -->
</Carousel>
```

---

## Props Reference

- `autoplay` (boolean): Automatically cycle slides.
- `autoplayDelay` (number): Delay between slides (ms).
- `infinite` (boolean): Loop slides infinitely.
- `pauseOnHover` (boolean): Pause on mouse hover.
- `showIndicators` (boolean): Show navigation dots.
- `showNavigation` (boolean): Show prev/next buttons.
- `breakpoints` (object): Responsive items per view.

## Notes

- Wrap each slide in a `CarouselItem`.
- Place any content inside `CarouselItem` (text, images, cards, etc.).
- Customize styles as needed for your application.

---

For more advanced usage, refer to the props in the component files.
