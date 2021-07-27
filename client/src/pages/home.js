import React from 'react';

/* Home page */
function Home() {
    return (
        <div className="main-container" >
            <div className="inner-container">
                <div className="about-header">
                    <h1 className="heading">"Education is not the filling of a pail, but the lightning of a fire" - W.B.Yeats</h1>
                    <h2>Hi, I am Ritu Rawat.</h2>
                    <h3>A web developer, a minimalist and lifelong learner. This blog is a diary of tidbits learned, insights gained and AHA! moments in my journey to learning web development in general, and React in particular.  </h3>
                </div>
                <p className="emailDeets">Drop me a mail @ <span>ritu.sarma29@gmail.com</span></p>
            </div>
        </div>
    )
}

export default Home;