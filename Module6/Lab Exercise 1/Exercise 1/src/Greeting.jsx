function Greeting(props) {
    
    return (
      <div className="greeting">
        <h2>Hello {props.name || "World"}</h2>
        {props.children ? <div className="greeting-message">{props.children}</div> : null}
      </div>
    );
  }
  
  export default Greeting;