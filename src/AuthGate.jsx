import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, firebaseConfigured } from './firebase'
import Auth from './Auth'
import App from './App'

export default function AuthGate() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!firebaseConfigured || !auth) {
      setLoading(false)
      return undefined
    }
    return onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="auth-loading"><div className="auth-spinner"/><span>Getting your campus ready…</span></div>
  if (!firebaseConfigured) return <Auth configurationMissing />
  if (!user) return <Auth />
  return <App user={user} onSignOut={() => signOut(auth)} />
}
