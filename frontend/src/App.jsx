import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function Auth() {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() 
    const endpoint = isSignup ? 'https://ai-finance-tracker-backend-pfwf.onrender.com/signup' : 'https://ai-finance-tracker-backend-pfwf.onrender.com/login'

    try {
      let response;
      if (isSignup) {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        })
      } else {
        const formData = new URLSearchParams()
        formData.append('username', email) 
        formData.append('password', password)
        
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        })
      }

      if (response.ok) {
        const data = await response.json()
        if (isSignup) {
          alert("Account created successfully! Please log in.")
          setIsSignup(false) 
        } else {
          localStorage.setItem('token', data.access_token)
          navigate('/dashboard')
        }
      } else {
        const errorData = await response.json()
        alert("Error: " + errorData.detail)
      }
    } catch (error) {
      alert("Network Error: Is your FastAPI server running?")
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <header style={{ padding: '40px 8%', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#000', letterSpacing: '-0.5px' }}>
          AI Finance Tracker
        </h1>
      </header>

      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 8%', 
        gap: '60px', 
        flexWrap: 'wrap',
        paddingBottom: '80px'
      }}>
        
        <div style={{ flex: 1, minWidth: '320px', maxWidth: '580px' }}>
          <h2 style={{ 
            fontSize: '4.5rem', 
            fontWeight: '800', 
            lineHeight: '1.1', 
            marginBottom: '24px', 
            color: '#000',
            letterSpacing: '-2px'
          }}>
            AI-Powered Money<br/>Management,<br/>Simplified.
          </h2>
          <p style={{ 
            fontSize: '1.15rem', 
            lineHeight: '1.6', 
            color: '#000', 
            maxWidth: '500px',
            fontWeight: '400'
          }}>
            Master your money with our intelligent personal finance tracker. 
            From automated transaction categorization to insightful budgeting 
            and tailored reports, our AI helps you make smarter decisions. 
            Experience powerful, fast personal finance at your fingertips.
          </p>
        </div>

        <div style={{ flex: 1, minWidth: '320px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '420px', 
            backgroundColor: '#fafaf8',
            borderRadius: '12px', 
            padding: '40px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)', 
            border: '1px solid #eaeaea'
          }}>
            
            <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid #e0e0e0' }}>
              <button 
                onClick={() => setIsSignup(false)} 
                style={{ 
                  flex: 1, padding: '12px 0', background: 'none', border: 'none', 
                  borderBottom: !isSignup ? '2px solid #000' : '2px solid transparent', 
                  fontWeight: !isSignup ? '600' : '400', fontSize: '1.05rem', 
                  cursor: 'pointer', color: !isSignup ? '#000' : '#888',
                  transition: 'all 0.2s'
                }}>
                Login
              </button>
              <button 
                onClick={() => setIsSignup(true)} 
                style={{ 
                  flex: 1, padding: '12px 0', background: 'none', border: 'none', 
                  borderBottom: isSignup ? '2px solid #000' : '2px solid transparent', 
                  fontWeight: isSignup ? '600' : '400', fontSize: '1.05rem', 
                  cursor: 'pointer', color: isSignup ? '#000' : '#888',
                  transition: 'all 0.2s'
                }}>
                Signup
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {isSignup && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#000' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' }} 
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#000' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#000' }}>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontSize: '1rem' }} 
                />
              </div>

              {!isSignup && (
                <div style={{ textAlign: 'right' }}>
                  <span 
                    onClick={() => alert("Password reset instructions have been sent to your email! (Note: Email service is currently in mock mode).")}
                    style={{ fontSize: '0.85rem', color: '#000', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </span>
                </div>
              )}

              <button 
                type="submit" 
                style={{ 
                  padding: '16px', background: '#171717', color: '#fff', border: 'none', 
                  borderRadius: '8px', fontSize: '1rem', fontWeight: '600', 
                  cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' 
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#000'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#171717'}
              >
                {isSignup ? 'Signup' : 'Login'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: '#444' }}>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span 
                onClick={() => setIsSignup(!isSignup)} 
                style={{ cursor: 'pointer', fontWeight: '600', color: '#000' }}
              >
                {isSignup ? "Login." : "Signup."}
              </span>
            </p>

          </div>
        </div>

      </main>
    </div>
  )
}
// --- THE PREMIUM DASHBOARD (ZERO-CLICK AI CATEGORIZATION) ---
function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  
  // NEW: A loading state specifically for the save button so the user knows the AI is working
  const [isSaving, setIsSaving] = useState(false)
  
  const [editingId, setEditingId] = useState(null)
  const [userName, setUserName] = useState('') 
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all') 

  const [aiSummary, setAiSummary] = useState(null)
  const [isSummaryLoading, setIsSummaryLoading] = useState(false)
  const [chatQuestion, setChatQuestion] = useState('')
  const [chatAnswer, setChatAnswer] = useState(null)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [showAllActivity, setShowAllActivity] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [monthlyBudget, setMonthlyBudget] = useState(parseFloat(localStorage.getItem('monthlyBudget')) || 0)
  const [budgetInput, setBudgetInput] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetchUserProfile()
    fetchTransactions()
  }, [])

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const response = await fetch('https://ai-finance-tracker-backend-pfwf.onrender.com/users/me', { headers: { 'Authorization': `Bearer ${token}` } })
      if (response.ok) {
        const data = await response.json()
        setUserName(data.name.split(' ')[0])
      }
    } catch (error) { console.error(error) }
  }

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/')
    try {
      const response = await fetch('https://ai-finance-tracker-backend-pfwf.onrender.com/transactions', { headers: { 'Authorization': `Bearer ${token}` } })
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      } else if (response.status === 401) handleLogout()
    } catch (error) { console.error(error) }
  }

  const handleAddOrUpdateTransaction = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const token = localStorage.getItem('token')
    
    try {
        const aiResponse = await fetch('https://ai-finance-tracker-backend-pfwf.onrender.com/ai/suggest-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, type })
      })
      const aiData = await aiResponse.json()
      const aiCategory = aiData.category || "Other"

      const txData = { 
        amount: parseFloat(amount), 
        transaction_type: type, 
        category: aiCategory,
        date,
        description: description 
      }
      
      // STEP 3: Save to the database
      const endpoint = editingId ? `https://ai-finance-tracker-backend-pfwf.onrender.com/transactions/${editingId}` : 'https://ai-finance-tracker-backend-pfwf.onrender.com/transactions'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(txData)
      })
      
      if (response.ok) {
        setAmount(''); setDate(''); setDescription(''); setEditingId(null);
        fetchTransactions()
      } else {
        alert("Failed to save transaction.")
      }
    } catch (error) { 
      console.error(error) 
      alert("An error occurred while saving.")
    } finally {
      setIsSaving(false) // Re-enable the button
    }
  }

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`https://ai-finance-tracker-backend-pfwf.onrender.com/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        fetchTransactions()
      } else {
        alert("Failed to delete.")
      }
    } catch (error) { console.error(error) }
  }

  const handleEditClick = (tx) => {
    setEditingId(tx.id)
    setAmount(tx.amount)
    setType(tx.transaction_type)
    setDate(tx.date)
    setDescription(tx.description || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setAmount('')
    setType('expense')
    setDate('')
    setDescription('')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleSetBudget = (e) => {
    e.preventDefault()
    if (!budgetInput) return
    setMonthlyBudget(parseFloat(budgetInput))
    localStorage.setItem('monthlyBudget', budgetInput)
    setBudgetInput('')
  }

  const fetchAiSummary = async () => {
    setIsSummaryLoading(true)
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('https://ai-finance-tracker-backend-pfwf.onrender.com/ai/summary', { headers: { 'Authorization': `Bearer ${token}` }})
      if (response.ok) {
        const data = await response.json()
        setAiSummary(data.summary)
      }
    } catch (error) { console.error(error) } finally { setIsSummaryLoading(false) }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatQuestion) return
    setIsChatLoading(true)
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('https://ai-finance-tracker-backend-pfwf.onrender.com/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ question: chatQuestion })
      })
      if (response.ok) {
        const data = await response.json()
        setChatAnswer(data.answer)
      }
    } catch (error) { console.error(error) } finally { setIsChatLoading(false) }
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonthStr = todayStr.substring(0, 7);

  const totalIncome = transactions.filter(tx => tx.transaction_type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = transactions.filter(tx => tx.transaction_type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const currentMonthExpenses = transactions
    .filter(tx => tx.transaction_type === 'expense' && tx.date.startsWith(currentMonthStr))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const budgetPercentage = monthlyBudget > 0 ? Math.min((currentMonthExpenses / monthlyBudget) * 100, 100) : 0;
  const isOverBudget = currentMonthExpenses > monthlyBudget && monthlyBudget > 0;

  const expenseData = transactions
    .filter(tx => tx.transaction_type === 'expense')
    .reduce((acc, tx) => {
      const existing = acc.find(item => item.name === tx.category);
      if (existing) existing.value += tx.amount;
      else acc.push({ name: tx.category, value: tx.amount });
      return acc;
    }, []);
  const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b'];

  const filteredTransactions = transactions.filter(tx => {
    const searchString = `${tx.category} ${tx.description || ''} ${tx.date}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || tx.transaction_type === filterType;
    return matchesSearch && matchesType;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a.date !== b.date) return a.date > b.date ? -1 : 1;
    return b.id - a.id; 
  });

  const displayedTransactions = showAllActivity ? sortedTransactions : sortedTransactions.slice(0, 8);
  const upcomingTransactions = displayedTransactions.filter(tx => tx.date > todayStr);
  const pastTransactions = displayedTransactions.filter(tx => tx.date <= todayStr);

  const theme = {
    bg: isDarkMode ? '#0f172a' : '#fafaf8',
    cardBg: isDarkMode ? '#1e293b' : '#fff',
    textMain: isDarkMode ? '#f8fafc' : '#000',
    textMuted: isDarkMode ? '#94a3b8' : '#555',
    border: isDarkMode ? '#334155' : '#eaeaea',
    inputBg: isDarkMode ? '#0f172a' : '#fff',
    inputBorder: isDarkMode ? '#475569' : '#ccc',
    primaryButton: isDarkMode ? '#3b82f6' : '#171717',
    primaryButtonHover: isDarkMode ? '#2563eb' : '#000',
    headerBg: isDarkMode ? '#1e293b' : '#fff',
  }

  const cardStyle = { backgroundColor: theme.cardBg, color: theme.textMain, padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: `1px solid ${theme.border}`, marginBottom: '30px', transition: 'all 0.3s' }
  const inputStyle = { backgroundColor: theme.inputBg, color: theme.textMain, padding: '12px 16px', borderRadius: '8px', border: `1px solid ${theme.inputBorder}`, outline: 'none', fontSize: '0.95rem', width: '100%', boxSizing: 'border-box', transition: 'all 0.3s' }
  const buttonStyle = { padding: '14px', background: theme.primaryButton, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', opacity: isSaving ? 0.7 : 1 }

  const TransactionList = ({ list }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {list.map((tx) => (
        <li key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: `1px solid ${theme.border}` }}>
          <div>
            <strong style={{ fontSize: '1.05rem', color: theme.textMain }}>{tx.category}</strong> <br/>
            {tx.description && (
              <span style={{ color: theme.textMuted, fontSize: '0.85rem', display: 'block', margin: '4px 0' }}>
                {tx.description}
              </span>
            )}
            <small style={{ color: theme.textMuted }}>{tx.date}</small>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: tx.transaction_type === 'income' ? '#10b981' : '#ef4444', fontWeight: '700', fontSize: '1.1rem' }}>
              {tx.transaction_type === 'income' ? '+' : '-'}₹{tx.amount}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEditClick(tx)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.6 }} title="Edit">✏️</button>
              <button onClick={() => handleDeleteTransaction(tx.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.6 }} title="Delete">🗑️</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: theme.bg, color: theme.textMain, fontFamily: "'Inter', sans-serif", paddingBottom: '50px', transition: 'all 0.3s' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}`, transition: 'all 0.3s' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>AI Finance Tracker</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'transparent', color: theme.textMain, border: `1px solid ${theme.inputBorder}`, borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Logout</button>
        </div>
      </header>

      <section style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#064e3b', color: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(6,78,59,0.15)' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: '600', opacity: 0.8 }}>Total Income</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '2rem', fontWeight: '700' }}>₹{totalIncome.toFixed(2)}</h2>
        </div>
        <div style={{ backgroundColor: '#1e3a8a', color: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(30,58,138,0.15)' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: '600', opacity: 0.8 }}>Total Expenses</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '2rem', fontWeight: '700' }}>₹{totalExpenses.toFixed(2)}</h2>
        </div>
        <div style={{ backgroundColor: isDarkMode ? '#020617' : '#0f172a', color: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: '600', opacity: 0.8 }}>Net Balance</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '2rem', fontWeight: '700', color: netBalance >= 0 ? '#34d399' : '#f87171' }}>
            {netBalance < 0 ? '-' : ''}₹{Math.abs(netBalance).toFixed(2)}
          </h2>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '20px auto 0 auto', padding: '0 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        
        <div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Monthly Budget Goal</h3>
            {!monthlyBudget ? (
              <form onSubmit={handleSetBudget} style={{ display: 'flex', gap: '10px' }}>
                <input type="number" placeholder="Set monthly limit (₹)" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} required style={inputStyle} />
                <button type="submit" style={{...buttonStyle, padding: '12px 20px'}}>Set</button>
              </form>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem' }}>
                  <span>Spent: <strong>₹{currentMonthExpenses.toFixed(2)}</strong></span>
                  <span style={{ color: theme.textMuted }}>Limit: ₹{monthlyBudget.toFixed(2)}</span>
                </div>
                <div style={{ width: '100%', height: '12px', backgroundColor: theme.inputBorder, borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${budgetPercentage}%`, height: '100%', backgroundColor: isOverBudget ? '#ef4444' : '#10b981', transition: 'width 0.5s ease-in-out' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <small style={{ color: isOverBudget ? '#ef4444' : theme.textMuted, fontWeight: '600' }}>
                    {isOverBudget ? '⚠️ You are over budget!' : `${(100 - budgetPercentage).toFixed(0)}% remaining`}
                  </small>
                  <button onClick={() => setMonthlyBudget(0)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.85rem' }}>Edit Limit</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ ...cardStyle, border: editingId ? `2px solid ${theme.primaryButton}` : `1px solid ${theme.border}` }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>
              {editingId ? '✏️ Edit Transaction' : (userName ? `Hi ${userName}, log a transaction` : 'Log a transaction')}
            </h3>
            <form onSubmit={handleAddOrUpdateTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <input type="number" placeholder="Amount (in ₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required style={inputStyle} />
                <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <input 
                  type="text" 
                  placeholder="What was this for? (e.g. KFC, Gas Station)" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required
                  style={inputStyle} 
              />
              
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={isSaving} style={{ ...buttonStyle, flex: 1 }}>
                  {isSaving ? '✨ Auto-Categorizing & Saving...' : (editingId ? 'Update Transaction' : 'Save Transaction')}
                </button>
                {editingId && (
                  <button type="button" onClick={cancelEdit} disabled={isSaving} style={{ ...buttonStyle, backgroundColor: 'transparent', color: theme.textMain, border: `1px solid ${theme.inputBorder}`, flex: 0.5 }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', fontWeight: '700' }}>Your Activity</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input type="text" placeholder="Search category, notes, or date (YYYY-MM-DD)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ ...inputStyle, flex: 2, padding: '8px 12px' }} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ ...inputStyle, flex: 1, padding: '8px 12px' }}>
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            
            {filteredTransactions.length === 0 ? <p style={{ color: theme.textMuted }}>No transactions found.</p> : (
              <>
                {upcomingTransactions.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#f59e0b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Upcoming / Pending ⏳</h4>
                    <TransactionList list={upcomingTransactions} />
                  </div>
                )}
                {pastTransactions.length > 0 && (
                  <div>
                    <h4 style={{ margin: '0 0 10px 0', color: '#10b981', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Completed ✅</h4>
                    <TransactionList list={pastTransactions} />
                  </div>
                )}
                {sortedTransactions.length > 8 && (
                  <button onClick={() => setShowAllActivity(!showAllActivity)} style={{ width: '100%', padding: '12px', marginTop: '20px', backgroundColor: 'transparent', color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' }}>
                    {showAllActivity ? 'Show Less' : `Show All (${sortedTransactions.length})`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Expense Breakdown</h3>
            {expenseData.length === 0 ? <p style={{ color: theme.textMuted }}>No expenses to visualize yet.</p> : (
              <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {expenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value}`} contentStyle={{ backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textMain, borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div style={{ ...cardStyle, borderTop: `4px solid ${theme.primaryButton}` }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>AI Financial Advisor</h3>
            <button onClick={fetchAiSummary} disabled={isSummaryLoading} style={{ ...buttonStyle, width: '100%', marginBottom: aiSummary ? '20px' : '0' }}>
              {isSummaryLoading ? 'Analyzing...' : 'Generate AI Report'}
            </button>
            {aiSummary && <div style={{ padding: '20px', background: theme.bg, borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '0.95rem', lineHeight: '1.6' }}>{aiSummary}</div>}
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Ask AI</h3>
            <form onSubmit={handleChatSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="e.g., How much did I spend on food?" value={chatQuestion} onChange={(e) => setChatQuestion(e.target.value)} required style={inputStyle} />
              <button type="submit" disabled={isChatLoading} style={buttonStyle}>{isChatLoading ? 'Thinking...' : 'Ask Question'}</button>
            </form>
            {chatAnswer && <div style={{ padding: '20px', marginTop: '20px', background: theme.bg, borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '0.95rem', lineHeight: '1.6' }}><strong>AI:</strong> <br/>{chatAnswer}</div>}
          </div>
        </div>

      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App