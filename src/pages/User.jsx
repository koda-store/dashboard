
import { api } from "../api/axios";
import React, { useState, useEffect } from "react";
import { FiUserPlus, FiX } from "react-icons/fi";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

useEffect(() => {
  fetchUsers();
}, []);


//////////////////////////

const fetchUsers = async () => {
  try {
    setLoading(true);

    const response = await api.get("/users/admin");

    const data = response.data;

    if (Array.isArray(data)) {
      setUsers(data);
    } else if (Array.isArray(data.data)) {
      setUsers(data.data);
    } else if (Array.isArray(data.users)) {
      setUsers(data.users);
    } else {
      setUsers([]);
    }

    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
}; 

/////////////////////////////////////////////////////


const handleCreateUser = async (e) => {
  e.preventDefault();

  if (!username || !email || !password) {
    alert("برجاء ملء الحقول الإلزامية");
    return;
  }

  try {
    await api.post("/users/admin", {
      username,
      email,
      password,
      phone,
    });

    await fetchUsers();
    handleClear();
    setShowAddForm(false);
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
}; 
//////////////////////////////////////

const handleDeleteUser = async (id) => {
  if (!window.confirm("هل أنت متأكد من الحذف؟")) return;

  try {
    await api.delete(`/users/admin/${id}`);

    setUsers((prev) => prev.filter((user) => user._id !== id));
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};


  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  if (loading) {
    return (
      <div className="
      w-full
       h-64
        flex flex-col items-center
         justify-center
         ">
        <div className="
        animate-spin
         rounded-full
          h-8 w-8 
          border-b-2 
          border-cyan-500
          ">
          </div>
        <p className="
        mt-2 
        text-xs 
        text-slate-400">جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full 
      h-64 
      flex flex-col 
      items-center justify-center
       p-5">
        <div className="bg-red-50 
        
        border border-red-100
         p-5 rounded-2xl
          max-w-sm 
          text-center">
          <p className="text-xs font-bold text-red-500">API عذراً، تعذر الاتصال بالـ</p>
          <p className="text-[11px] text-red-400 mt-1">{error}</p>
          <button onClick={fetchUsers} className="mt-3
           px-4 py-1.5
            bg-cyan-500 
            text-white
             text-xs 
             font-bold rounded-xl">إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  


  return (
    <div className="w-full pt-30 pl-4 lg:pl-72 pr-4 md:pr-8 bg-slate-50 text-slate-800 min-h-screen box-border">

      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-white border border-green-500/30 px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <div className="p-1 bg-green-100 text-green-600 rounded-full">
            <FiCheck size={16} />
          </div>
          <span className="text-xs font-semibold text-slate-700">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-md">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-cyan-600 uppercase">User Management</span>
          <h1 className="text-xl font-bold mt-0.5 text-slate-900">Manage Users</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative z-10 w-full sm:w-64 md:w-72 lg:w-92">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <FiSearch className="text-sm" />
            </span>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-cyan-400 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-400/40 text-sm transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] rounded-2xl overflow-hidden"
          >
            <FiUserPlus size={22} className="stroke-[2.5]" />
            <span>Add User</span>
            <FiChevronDown className="border-l border-white/20 pl-1.5 text-xl" />
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateUser} className="bg-white border-2 border-cyan-300 rounded-2xl p-4 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center">
                <FiUserPlus size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">Create New User</h2>
                <p className="text-xs text-slate-400 mt-0.5">Fill in the details below to add a new user</p>
              </div>
            </div>
            <button type="button" onClick={() => setShowAddForm(false)} className="text-slate-300 hover:text-slate-500 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
              <FiX size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Username <span className="text-red-500">*</span></label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-50/30 border border-cyan-200 text-xs focus:border-cyan-500 transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-50/30 border border-cyan-200 text-xs focus:border-cyan-500 transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-50/30 border border-cyan-200 text-xs focus:border-cyan-500 transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-50/30 border border-cyan-200 text-xs focus:border-cyan-500 transition-all" />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400"><span className="text-red-500">*</span> Required fields</span>
            <div className="flex gap-2">
              <button type="button" onClick={handleClear} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs">Clear</button>
              <button type="submit" className="px-4 py-1.5 bg-cyan-500 text-white rounded-xl text-xs flex items-center gap-1.5">
                <FiUserPlus size={16} /> Create User
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200/70 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg transition-shadow">
          <div><p className="text-[11px] text-slate-400 font-medium">Total Users</p><h3 className="text-lg font-bold text-slate-900 mt-0.5">{users.length}</h3></div>
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl"><FiUsers size={22} /></div>
        </div>
        <div className="bg-white border border-slate-200/70 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg transition-shadow">
          <div><p className="text-[11px] text-slate-400 font-medium">Admins</p><h3 className="text-lg font-bold text-slate-900 mt-0.5">{users.filter(u => u.role === "admin").length}</h3></div>
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><FiShield size={22} /></div>
        </div>
        <div className="bg-white border border-slate-200/70 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg transition-shadow">
          <div><p className="text-[11px] text-slate-400 font-medium">Customers</p><h3 className="text-lg font-bold text-slate-900 mt-0.5">{users.filter(u => u.role === "customer").length}</h3></div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><FiUsers size={22} /></div>
        </div>
        <div className="bg-white border border-slate-200/70 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg transition-shadow">
          <div><p className="text-[11px] text-slate-400 font-medium">Verified</p><h3 className="text-lg font-bold text-slate-900 mt-0.5">{users.filter(u => u.verified).length}</h3></div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><FiUserCheck size={22} /></div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[11px] font-semibold uppercase bg-slate-50/80">
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Verified</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 overflow-hidden font-semibold uppercase text-xs">
                      {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : (user.name || user.username || "?").charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 capitalize">{user.name || user.username}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${user.role === "admin" ? "bg-purple-50 text-purple-600 border-purple-200" : "bg-blue-50 text-blue-600 border-blue-200"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {user.verified ? <span className="text-emerald-600 font-medium flex items-center gap-1"><FiCheck /> Verified</span> : <span className="text-rose-500 font-medium flex items-center gap-1"><FiX /> No</span>}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button type="button" onClick={() => handleEditClick(user)} className="p-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors" title="Edit">
                        <FiEdit2 size={12} />
                      </button>
                      <button type="button" onClick={() => handleToggleRole(user._id || user.id)} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors" title="Toggle Role">
                        <FiUserCheck size={12} />
                      </button>
                      <button type="button" onClick={() => handleDeleteUser(user._id || user.id)} className="p-1.5 bg-rose-50 text-rose-600 rounded-full border border-rose-100 hover:bg-rose-100 transition-colors" title="Delete">
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-bold text-slate-800">Edit User</h3>
              <button type="button" onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveChanges} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Username</label>
                <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Phone</label>
                <input type="text" value={editingUser.phone || ""} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Avatar URL</label>
                <input type="text" placeholder="https://cdn-icons-png..." value={editingUser.avatar || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, avatar: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs transition-colors shadow-md">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default User;
