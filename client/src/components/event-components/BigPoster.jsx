import { Link } from 'react-router-dom';
import './BigPoster.css';

function BigPoster() {
  return (
    <div className="big-poster">
      <div className="poster-background">
        <img src="/images/big-poster.png" alt="Events Poster" />
      </div>
      
      <div className="poster-overlay">
        <div className="poster-content">
          <div className="poster-text">
            <p className="poster-main-text">
              Stop hearing about the best parties and workshops after they happen! 
              Whether you're looking for the hottest concerts in Douala, exclusive 
              business networking in Yaoundé, or the most beautiful cultural festivals 
              across the country. It's all here!.
            </p>
            
            <p className="poster-sub-text">
              From Limbe to Garoua, we've brought every vibe into one space. Explore, 
              discover, and secure your spot in seconds.
            </p>
          </div>

          <Link to="/register" className="poster-button">
            Register Now →
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default BigPoster;
