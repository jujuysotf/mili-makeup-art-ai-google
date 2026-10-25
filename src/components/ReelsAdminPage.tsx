import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2, LogOut, Save, Lock } from 'lucide-react';

type ReelDraft = {
  id: string;
  title: string;
  badge: string;
  description: string;
  url: string;
  src: string;
  active: boolean;
};

function emptyReel(): ReelDraft {
  return {
    id: `reel-${Date.now()}`,
    title: '',
    badge: '',
    description: '',
    url: '',
    src: '',
    active: true,
  };
}

export const ReelsAdminPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [reels, setReels] = useState<ReelDraft[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/reels?all=1', { credentials: 'include' });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error('No se pudieron cargar los reels');
      const data = await res.json();
      setReels(
        (data.reels || []).map((r: any) => ({
          id: r.id || `reel-${Date.now()}`,
          title: r.title || '',
          badge: r.badge || '',
          description: r.description || '',
          url: r.url || '',
          src: r.src || '',
          active: r.active !== false,
        }))
      );
      setAuthed(true);
    } catch (err: any) {
      setError(err?.message || 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/reels/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'PIN incorrecto');
      setPassword('');
      await loadAll();
      setMessage('Sesión iniciada');
    } catch (err: any) {
      setError(err?.message || 'No se pudo iniciar sesión');
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/reels/logout', { method: 'POST', credentials: 'include' });
    setAuthed(false);
    setReels([]);
    setMessage('Sesión cerrada');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/reels', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reels: reels.map((r) => ({
            id: r.id,
            title: r.title.trim() || 'Reel',
            badge: r.badge.trim() || undefined,
            description: r.description.trim() || undefined,
            url: r.url.trim() || undefined,
            src: r.src.trim() || undefined,
            active: r.active,
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar');
      setMessage(`Guardado (${data.storage || 'ok'})`);
      if (Array.isArray(data.reels)) {
        setReels(
          data.reels.map((r: any) => ({
            id: r.id,
            title: r.title || '',
            badge: r.badge || '',
            description: r.description || '',
            url: r.url || '',
            src: r.src || '',
            active: r.active !== false,
          }))
        );
      }
    } catch (err: any) {
      setError(err?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const updateReel = (index: number, patch: Partial<ReelDraft>) => {
    setReels((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  const moveReel = (index: number, direction: -1 | 1) => {
    setReels((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF4F6] text-[#1A1A1A] px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C5558]">Uso interno</p>
            <h1 className="text-2xl font-bold">Gestión de Reels</h1>
            <p className="text-xs text-[#5C5558] mt-1">
              Pegá los links de Instagram que querés mostrar en la web. URL privada: <code className="bg-white px-1 rounded">#gestion-reels</code>
            </p>
          </div>
          <a href="/#videos" className="text-xs font-semibold text-[#5C5558] hover:text-[#1A1A1A] underline">
            Volver al sitio
          </a>
        </div>

        {!authed ? (
          <form onSubmit={handleLogin} className="bg-white border border-[#E7D5DB] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Lock className="w-4 h-4 text-[#F4A7C1]" />
              Ingresá el PIN de 4 dígitos
            </div>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="w-full px-4 py-3 rounded-xl border border-[#E7D5DB] text-center text-lg tracking-[0.4em] focus:outline-none focus:border-[#1A1A1A]"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || password.length < 4}
              className="w-full py-3 rounded-full bg-[#1A1A1A] text-white text-sm font-semibold disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <button
                type="button"
                onClick={() => setReels((prev) => [...prev, emptyReel()])}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar reel
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Salir
                </button>
              </div>
            </div>

            {reels.map((reel, index) => (
              <div key={reel.id} className="bg-white border border-[#E7D5DB] rounded-3xl p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={reel.active}
                      onChange={(e) => updateReel(index, { active: e.target.checked })}
                    />
                    Visible en la web
                  </label>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => moveReel(index, -1)} className="p-1.5 rounded-lg border border-[#E7D5DB]" aria-label="Subir">
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => moveReel(index, 1)} className="p-1.5 rounded-lg border border-[#E7D5DB]" aria-label="Bajar">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setReels((prev) => prev.filter((_, i) => i !== index))}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <input
                  value={reel.url}
                  onChange={(e) => updateReel(index, { url: e.target.value })}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5DB] text-xs focus:outline-none focus:border-[#1A1A1A]"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    value={reel.title}
                    onChange={(e) => updateReel(index, { title: e.target.value })}
                    placeholder="Título"
                    className="w-full px-3 py-2 rounded-xl border border-[#E7D5DB] text-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                  <input
                    value={reel.badge}
                    onChange={(e) => updateReel(index, { badge: e.target.value })}
                    placeholder="Etiqueta (ej. Novias)"
                    className="w-full px-3 py-2 rounded-xl border border-[#E7D5DB] text-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <textarea
                  value={reel.description}
                  onChange={(e) => updateReel(index, { description: e.target.value })}
                  placeholder="Descripción corta (opcional)"
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5DB] text-xs focus:outline-none focus:border-[#1A1A1A]"
                />
                <input
                  value={reel.src}
                  onChange={(e) => updateReel(index, { src: e.target.value })}
                  placeholder="Video local opcional (ej. /assets/video.mp4)"
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5DB] text-xs focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>}
        {message && !error && <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{message}</p>}
      </div>
    </div>
  );
};
