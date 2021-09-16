import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { currentUser, setCurrentUser } = useAppContext();
  const { onError, onWarning, onSuccess } = useToastManager();
  // const { register, handleSubmit } = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-4 mb-4">
      <h1>Registration</h1>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-4 mt-2">
                <label for="fname">First Name</label>
                <input
                  className="form-control"
                  id="fname"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName?.type === "required" && (
                  <p className="text-danger text-small">
                    First name is required
                  </p>
                )}
              </div>
              <div className="col-md-4 mt-2">
                <label for="mname">Middle Name</label>
                <input
                  className="form-control"
                  id="mname"
                  {...register("middleName", { required: true })}
                />
                {errors.middleName?.type === "required" && (
                  <p className="text-danger text-small">
                    Middle name is required
                  </p>
                )}
              </div>
              <div className="col-md-4 mt-2">
                <label for="lname">Last Name</label>
                <input
                  className="form-control"
                  id="lname"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName?.type === "required" && (
                  <p className="text-danger text-small">
                    Last name is required
                  </p>
                )}
              </div>
              <div className="col-md-4 mt-2">
                <label for="idno">ID Number</label>
                <input
                  className="form-control"
                  id="idno"
                  {...register("idNu", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
                {errors.idNu?.type === "required" && (
                  <p className="text-danger text-small">
                    ID Number is required
                  </p>
                )}
                {errors.idNu?.type === "minLength" && (
                  <p className="text-danger text-small">
                    ID Number should be 10 Characters
                  </p>
                )}
                {errors.idNu?.type === "maxLength" && (
                  <p className="text-danger text-small">
                    ID Number should not exceed 10 Characters
                  </p>
                )}
              </div>
              <div className="col-md-4 mt-2">
                <label for="phone">Phone Number</label>
                <input
                  className="form-control"
                  id="phone"
                  {...register("phoneNum", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
                {errors.phoneNum?.type === "required" && (
                  <p className="text-danger text-small">
                    Phone Number is required
                  </p>
                )}
                {errors.phoneNum?.type === "minLength" && (
                  <p className="text-danger text-small">
                    Phone Number should be 10 Characters
                  </p>
                )}
                {errors.phoneNum?.type === "maxLength" && (
                  <p className="text-danger text-small">
                    Phone Number should not exceed 10 Characters
                  </p>
                )}
              </div>
              <div className="col-md-4 mt-2">
                <label for="email">Email Address</label>
                <input
                  className="form-control"
                  id="email"
                  {...register("emailAdd", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                />
                {errors.emailAdd?.type === "required" && (
                  <p className="text-danger text-small">
                    Email Address is required
                  </p>
                )}
                {errors.emailAdd?.type === "pattern" && (
                  <p className="text-danger text-small">
                    Email Address is Invalid
                  </p>
                )}
              </div>
              <div className="col-md-4 mt-2">
                <label for="pass">Password</label>
                <input
                  className="form-control"
                  id="pass"
                  {...register("passWord", { required: true })}
                />
                {errors.passWord?.type === "required" && (
                  <p className="text-danger text-small">Password is required</p>
                )}
              </div>

              <div className="col-md-4 mt-2">
                <label for="code">Invitation Code</label>
                <input
                  className="form-control"
                  id="code"
                  {...register("invCode", { maxLength: 6, minLength: 6 })}
                />
                {errors.invCode?.type === "maxLength" && (
                  <p className="text-danger text-small">
                    Invitation Code is invalid
                  </p>
                )}
                {errors.invCode?.type === "minLength" && (
                  <p className="text-danger text-small">
                    Invitation Code is invalid
                    {errors.invCode?.type === "required" && (
                      <p className="text-danger text-small">
                        Invitation Code is invalid
                      </p>
                    )}
                  </p>
                )}
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    id="terms"
                    type="checkbox"
                    {...register("terMs", { required: true })}
                  />
                  <label class="form-check-label" for="terms">
                    I have read and understood all the{" "}
                    <NavLink to="/terms">
                      Terms &amp; Conditions
                    </NavLink>
                  </label>
                </div>
                {errors.terMs?.type === "required" && (
                  <p className="text-danger text-small">
                    Kindly read our read our{" "}
                    <NavLink to="/terms" className="text-danger">
                      Terms &amp; Conditions
                    </NavLink>
                  </p>
                )}
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Create Account
            </button>
            <p>
              Have an account?{' '}
              <NavLink to="/signin">Sign in</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
