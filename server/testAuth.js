const testAuth = async () => {

  try {

    /* REGISTER */
    const registerResponse = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Vinayak",
          email: "23u2487@students.git.edu",
          password: "123456",
        }),
      }
    );

    const registerData =
      await registerResponse.json();

    console.log("\nREGISTER RESPONSE:");
    console.log(registerData);

    /* LOGIN */
    const loginResponse = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "23u2487@students.git.edu",
          password: "123456",
        }),
      }
    );

    const loginData =
      await loginResponse.json();

    console.log("\nLOGIN RESPONSE:");
    console.log(loginData);

  } catch (error) {

    console.error(error);

  }
};

testAuth();