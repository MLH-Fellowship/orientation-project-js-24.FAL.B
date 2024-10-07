import React, { useState, useRef, useEffect } from "react";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log(userInfo);
    setIsOpen(false);
  };

  //  clicking outside modal should close the form
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // modal form
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add User</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef} role="dialog">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <p>Add User information</p>
            <form className="form" onSubmit={handleSubmit} role="form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userInfo.name}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone"
                value={userInfo.phone_number}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
