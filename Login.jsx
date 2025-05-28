import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', accepted: false });
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const errs = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (!emailRegex.test(form.email)) errs.email = "Geçerli bir email giriniz.";
    if (!passwordRegex.test(form.password)) errs.password = "Şifre en az 8 karakter, bir büyük harf ve bir sayı içermelidir.";
    if (!form.accepted) errs.accepted = "Şartları kabul etmelisiniz.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/success");
  };

  return (
    <form onSubmit={handleSubmit} data-cy="login-form">
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" data-cy="email" />
      {errors.email && <p data-cy="error-email">{errors.email}</p>}

      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Şifre" data-cy="password" />
      {errors.password && <p data-cy="error-password">{errors.password}</p>}

      <label>
        <input type="checkbox" name="accepted" checked={form.accepted} onChange={handleChange} data-cy="checkbox" />
        Şartları kabul ediyorum
      </label>
      {errors.accepted && <p data-cy="error-accepted">{errors.accepted}</p>}

      <button type="submit" disabled={!validate()} data-cy="submit">Giriş Yap</button>
    </form>
  );
}
