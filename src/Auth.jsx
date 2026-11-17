import { useState } from 'react'
import {
  createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, updateProfile
} from 'firebase/auth'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { auth, firebaseConfigured } from './firebase'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export default function Auth({ configurationMissing = false }) {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const run = async action => {
    setError('')
    setMessage('')
    setBusy(true)
    try { await action() }
    catch (err) {
      const messages = {
        'auth/invalid-credential': 'Email or password is incorrect.',
        'auth/email-already-in-use': 'An account already exists with this email. Try signing in.',
        'auth/weak-password': 'Use a password with at least 6 characters.',
        'auth/invalid-email': 'Enter a valid email address.',
        'auth/popup-closed-by-user': 'Google sign-in was closed before completion.',
        'auth/popup-blocked': 'Your browser blocked the Google popup. Allow popups and try again.',
        'auth/unauthorized-domain': 'This website domain is not authorised in Firebase Authentication settings.',
        'auth/network-request-failed': 'Network error. Check your connection and try again.',
        'auth/too-many-requests': 'Too many attempts. Please wait a little and try again.'
      }
      setError(messages[err.code] || err.message || 'Something went wrong. Please try again.')
    } finally { setBusy(false) }
  }

  const submit = event => {
    event.preventDefault()
    if (!auth || !firebaseConfigured) return
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }
    run(async () => {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password)
        await updateProfile(result.user, { displayName: name.trim() })
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }
    })
  }

  const googleSignIn = () => run(() => signInWithPopup(auth, googleProvider))
  const resetPassword = () => {
    if (!email.trim()) { setError('Enter your email first, then choose Forgot password.'); return }
    run(async () => {
      await sendPasswordResetEmail(auth, email.trim())
      setMessage('Password reset email sent. Check your inbox.')
    })
  }

  return <main className="auth-page">
    <div className="auth-ambient auth-ambient-one"/><div className="auth-ambient auth-ambient-two"/>
    <section className="auth-showcase">
      <a className="auth-brand" href="/" aria-label="CampusConnect home">
        <img src="/campusconnect-logo.png" alt="CampusConnect" onError={e => { e.currentTarget.style.display = 'none' }} />
        <span>campus<span>connect</span><i>.</i></span>
      </a>
      <div className="auth-showcase-copy">
        <div className="auth-kicker"><span/> A COMMUNITY THAT MOVES YOU FORWARD</div>
        <h1>Your campus is<br/>full of <em>possibility.</em></h1>
        <p>Meet your people. Share what you know. Find the opportunities that take you further.</p>
        <div className="auth-proof"><div className="proof-avatars"><b>CC</b><b>+</b><b>YOU</b></div><span>A better campus experience starts here.</span></div>
      </div>
      <div className="auth-showcase-foot"><span>LEARN TOGETHER</span><span>BUILD TOGETHER</span><span>GROW TOGETHER</span></div>
    </section>
    <section className="auth-panel-wrap">
      <div className="auth-panel">
        <div className="auth-mobile-brand"><img src="/campusconnect-logo.png" alt="CampusConnect" onError={e => { e.currentTarget.style.display = 'none' }}/><span>campus<span>connect</span><i>.</i></span></div>
        <div className="auth-panel-top"><span>YOUR STUDENT NETWORK</span><div><ShieldCheck size={14}/> Secure sign in</div></div>
        <h2>{configurationMissing ? 'One quick setup.' : mode === 'signup' ? 'Create your account.' : 'Welcome back.'}</h2>
        <p className="auth-subtitle">{configurationMissing ? 'Connect Firebase to activate secure registration and Google sign-in.' : mode === 'signup' ? 'Join your student community. It only takes a moment.' : 'Sign in to pick up where your campus life left off.'}</p>
        {configurationMissing ? <div className="config-notice"><LockKeyhole size={20}/><strong>Authentication is not configured yet</strong><p>Add the Firebase web app settings to your deployment environment. Then enable Email/Password and Google under Firebase Authentication → Sign-in method.</p><code>See .env.example in the repository</code></div> : <>
          <button className="google-btn" onClick={googleSignIn} disabled={busy}><span className="google-g">G</span>{busy ? 'Please wait…' : 'Continue with Google'}</button>
          <div className="auth-divider"><span/>or continue with email<span/></div>
          <form onSubmit={submit} className="auth-form">
            {mode === 'signup' && <label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" autoComplete="name" required minLength={2}/></label>}
            <label>Email address<div className="auth-input-wrap"><Mail size={16}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required/></div></label>
            <label>Password<div className="auth-input-wrap"><LockKeyhole size={16}/><input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==='signup'?'At least 6 characters':'Your password'} autoComplete={mode==='signup'?'new-password':'current-password'} minLength={6} required/><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>
            {mode === 'signin' && <button type="button" className="forgot-link" onClick={resetPassword}>Forgot password?</button>}
            {error && <div className="auth-error" role="alert">{error}</div>}
            {message && <div className="auth-success" role="status">{message}</div>}
            <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode==='signup'?'Create account':'Sign in'} <ArrowRight size={16}/></button>
          </form>
          <div className="auth-switch">{mode==='signup'?'Already have an account?':'New to CampusConnect?'} <button onClick={()=>{setMode(mode==='signup'?'signin':'signup');setError('');setMessage('')}}>{mode==='signup'?'Sign in':'Create an account'}</button></div>
        </>}
        <div className="auth-legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</div>
      </div>
    </section>
  </main>
}
