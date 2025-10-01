import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function saveTemplate(payload: {
  name: string;
  design: any;
  html: string;
}) {
  const res = await axios.post(`${API_BASE}/templates`, payload);
  return res.data;
}

export async function loadTemplate(id?: string) {
  const url = id ? `${API_BASE}/templates/${id}` : `${API_BASE}/templates/latest`;
  const res = await axios.get(url);
  return res.data;
}
