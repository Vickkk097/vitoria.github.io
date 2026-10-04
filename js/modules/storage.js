const STORAGE_KEY = 'rede-semente:cadastros:v1';

export function getVolunteerRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const records = JSON.parse(saved);
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error('Não foi possível ler os cadastros salvos neste navegador.', error);
    return [];
  }
}

export function saveVolunteer(data) {
  let records = [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    records = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(records)) throw new TypeError('O histórico salvo não está em formato de lista.');
    const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    records.push({ id, createdAt: new Date().toISOString(), ...data });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error('Não foi possível gravar o cadastro no armazenamento local.', error);
    return false;
  }
}
