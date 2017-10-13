var SignUp = (props) => (
  <div className="signupPage">
    <h1>Sign Up</h1>
    <form onSubmit={props.signup}>
      <label htmlFor="username">Username:  </label>
      <input id="username" type="text" name="username"/>
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" name="password"/>
      <label htmlFor="phonenumber">Phone Number (optional):  </label>
      <input id="phonenumber" type="text" name="phonenumber"/>
      <input type="submit" value="Sign Up"/>
      <p>By putting in your phone number you are agreeing to receive text message reminders</p>
    </form>
  </div>
);


window.SignUp = SignUp;
