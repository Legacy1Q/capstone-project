import { useState } from 'react';
import './ReviewTV.css';
import CircleIcon from '@mui/icons-material/Circle';
import Button from 'react-bootstrap/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function ReviewTV() {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    setShowVideo(true);
  };
  
  return (
    <div className='review_tv'>
      <div className="review_header">
        <div className="review_background">
          <img src="./images/ahsoka_background.jpg" alt="" />
        </div>
        <div className="review_image">
          <img src="./images\ahsoka 1440.jpg" alt="" />
        </div>

        <div className="review_title">
          <h1>Ahsoka</h1>
          <div className="review_info">
            <h3>2023</h3>
            <CircleIcon  className='circle_icon' />
            <h3>Action</h3>
          </div>
        </div>

        <div className="review_extras">
          <Button className='review_button' variant="light"  onClick={handlePlayVideo}>Watch Trailer <PlayArrowIcon className='play_arrow_icon'/></Button>
        </div>
        
        {showVideo && (
          <div className="video_overlay">
            <video width="640" height="360" controls>
              <source src="https://www.youtube.com/watch?v=J_1EXWNETiI&list=PPSV" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </div>  
        )}

      </div>

      <div className="review__body">
          <div className="review__container">
            
          </div>
        </div>
    </div>
  )
}

export default ReviewTV;
