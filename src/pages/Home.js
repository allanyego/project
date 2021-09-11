import homeimg from '../assets/img/homeimg.png';
import indeximg from '../assets/img/eve-1071355-877x1169.jpg';

export default function Home() {
  const home_img = {
    height:"600px",	
    width:"100%",
    objectFit:"cover", 
    objectPosition:"top"
  };
  return (
    <div>
      <img src={homeimg} style={home_img} alt="..."/>

      <div class="main bg-dark text-primary">
        <div class="container">
          <div class="col-md-10 mx-auto">
            <hr class="line"/>
              <h2 class="text-center"><em>Our main focus, is Financial Freedom</em></h2>
            <hr class="line"/>
          </div>
        </div>
      </div>
      <div class="digital">
        <div class="container">
            <div class="row justify-content-center align-items-center ">
              <div class="col-md-6">
                  <div class="text-wrapper">
                      <h1 class="mbr-section-title mbr-fonts-style mb-3 display-2"><strong>The Sparkles Digital Investment Network</strong></h1>
                      <p class="mbr-text mbr-fonts-style display-7">
                          The Sparkles Digital provides you with a dynamic, exciting, and rapidly expanding profession, a legitimate profession that will generate wealth and contributes positively to our society.
                      </p>
                      <div class="mbr-section-btn mt-3">
                        <a class="btn btn-black-outline display-4" href="intro.php" style={{color:"#4F87EE", letterSpacing:"1px"}}><strong>Explore all features</strong></a>
                        <a class="btn  btn-primary btn-shadow  display-4" href="/register">Create account</a>
                      </div>
                  </div>
              </div>
                <div class="col-md-6 mobileshow">
                    <img src={indeximg} style={{width:"auto",height:"700px"}} alt="Home" />
                </div>
            </div>
        </div>
      </div>

      <div class="unplug text-center text-light">
        <div class="container">
          <div class="p-100">
            <h1><strong>Time to unplug</strong></h1>
            <h3 class="mt-4"> Let your investments cater for your holiday &amp; Vacations</h3>
            <a class="mt-4 btn btn-lg btn-warning btn-shadow display-4" href="/register">Sign up Now!</a>
          </div>
        </div>
      </div>

      <div class="bg-dark text-primary text-center">
        <div class="container p-50">
          <h2>Share this Page!</h2>
          <div class="likely likely-big"
              data-url="https://sparklesdigital.net/"
              data-title="The Sparkles Digital Investment Network">
            <div class="btn twitter" data-via="username">Tweet</div>
            <div class="btn facebook">Share</div>
            <div class="btn pinterest">Pin</div>
          </div>
        </div>
      </div>

    </div>
    
  );
}
