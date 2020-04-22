import React from "react";
import Navbar from "../navbar/navbar.js";
import Footer from "../footer/footer.js";

export default function layout(props) {
  return (
    <React.Fragment>
      {!props.noHeader && (
        <Navbar
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          setLogout={props.setLogout}
        />
        //  <Carousel />
      )}
      {console.log("🍬props in layout", props)}
      {props.children}

      <Footer />
    </React.Fragment>
  );
}
