function About() {
    return <div>About2</div>
}


// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log('About.getStaticProps.', new Date())
  return {props : {}}
}    
  
export default About  