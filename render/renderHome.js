import { hero } from "../data/hero.js";
import { values } from "../data/values.js";
import { categories } from "../data/categories.js";
import { about } from "../data/about.js";
import { products } from "../data/products.js";
import { testimonials } from "../data/testimonials.js";
import { newsletter } from "../data/newsletter.js";

export function renderStoreHome() {
  // Hero
  document.getElementById("hero").innerHTML = `
    <div class="hero-content">
      <h1>${hero.title}</h1>
      <p>${hero.text}</p>
      <a href="${hero.link}" class="btn">
        ${hero.button} <i class="fas fa-arrow-right"></i>
      </a>
    </div>
    <div class="scroll-indicator">
      <i class="fas fa-chevron-down"></i>
    </div>
  `;

  // Values
  document.querySelector(".features-container").innerHTML = values
    .map(
      (item) => `
      <div class="feature-item">
        <i class="${item.icon}"></i>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `,
    )
    .join("");

  // Categories
  document.querySelector(".category-list").innerHTML = categories
    .map(
      (cat) => `
      <div class="cat-item">
        <img src="${cat.image}" alt="${cat.alt}">
        <a href="${cat.link}" class="btn-small">مشاهده</a>
      </div>
    `,
    )
    .join("");

  // About
  document.getElementById("about").innerHTML = `
    <div class="about-image">
      <img src="${about.image}" alt="${about.title}">
    </div>
    <div class="about-text">
      <h2>${about.title}</h2>
      <p>${about.text}</p>
      <a href="${about.link}" class="btn-outline">${about.button}</a>
    </div>
  `;

  // Products
  document.querySelector(".products-grid").innerHTML = products
    .map(
      (p) => `
      <div class="prod-card reveal stagger-item">
        <img src="${p.image}" alt="${p.title}">
        <div class="prod-info">
          <h3>${p.title}</h3>
          <p class="price">${p.price}</p>
          <a href="${p.link}" class="btn-icon">
            <i class="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    `,
    )
    .join("");

  // Testimonials
  document.querySelector(".testimonials-row").innerHTML = testimonials
    .map(
      (t) => `
      <div class="testimonial-content">
        <i class="fas fa-quote-left quote-icon"></i>
        <p>${t.text}</p>
        <div class="customer-info">
          <img src="${t.image}" alt="${t.name}">
          <h4>${t.name}</h4>
          <span>${t.role}</span>
        </div>
      </div>
    `,
    )
    .join("");

  // Newsletter
  document.getElementById("newsletter").innerHTML = `
    <h2>${newsletter.title}</h2>
    <p>${newsletter.text}</p>
    <div class="newsletter-form">
      <input type="email" placeholder="${newsletter.placeholder}">
      <button class="btn">${newsletter.button}</button>
    </div>
  `;
}
