import React from 'react'

const landing_page = () => {
  return (
    

      
 

      
    <div id="demo" className="carousel slide" data-ride="carousel">

 
  <ul id='next' className="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" className="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  
  
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://i.ibb.co/xM9GhDJ/17010.jpg" alt="Los Angeles" />
    </div>
    <div className="carousel-item">
      <img src="https://i.ibb.co/HN4WGPh/17012.jpg" alt="Chicago" />
    </div>
    <div className="carousel-item">
      <img src="https://i.ibb.co/V9TWg1S/17027.jpg" alt="New York" />
    </div>
  </div>
  
  
  <a className="carousel-control-prev" href="#demo" data-slide="prev">
    <span id='next' className="carousel-control-prev-icon"></span>
  </a>
  <a className="carousel-control-next" href="#demo" data-slide="next">
    <span id="prev" className="carousel-control-next-icon"></span>
  </a>
</div>

  )
}

export default landing_page