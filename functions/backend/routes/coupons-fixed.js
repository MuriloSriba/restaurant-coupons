/* Mobile responsive restaurant grid */
@media (max-width: 768px) {
  .restaurant-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 10px;
  },

  .restaurant-card {
    width: 100%;
    min-height: 300px;
    margin: 0 auto;
    box-sizing: border-box;
  }
,
  .restaurant-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
,
  .restaurant-card .card-content {
    padding: 15px;
  },

  .restaurant-card h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
,
  .restaurant-card p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

@media (max-width: 480px) {
  .restaurant-grid {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 5px;
  }

  .restaurant-card {
    min-height: 280px;
  }

  .restaurant-card img {
    height: 150px;
  }

  .restaurant-card .card-content {
    padding: 12px;
  }

  .restaurant-card h3 {
    font-size: 1.1rem;
  }

  .restaurant-card p {
    font-size: 0.85rem;
  }
}

/* Ensure consistent card sizing */
.restaurant-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.restaurant-card .card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.restaurant-card .card-actions {
  margin-top: auto;
}
