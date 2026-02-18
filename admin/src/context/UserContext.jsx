import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: '2023-01-15', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', joinDate: '2023-02-20', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', role: 'Customer', status: 'Inactive', joinDate: '2023-03-10', avatar: 'https://ui-avatars.com/api/?name=Mike+Ross&background=random' },
  { id: 4, name: 'Sarah Connor', email: 'sarah@example.com', role: 'Customer', status: 'Active', joinDate: '2023-04-05', avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=random' },
  { id: 5, name: 'Bruce Wayne', email: 'bruce@wayne.com', role: 'Customer', status: 'Active', joinDate: '2023-05-12', avatar: 'https://ui-avatars.com/api/?name=Bruce+Wayne&background=random' },
];

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const toggleUserStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, toggleUserStatus, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
