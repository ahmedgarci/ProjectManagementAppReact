

export default function TaskDatePicker({
  label,
  value,
  onChange
}: {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div style={{ marginTop: 16 }}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        Task {label} Date
      </label>

      <input
        type="date"
        value={value ?? ''}
        onChange={(e) =>
          onChange(e.target.value || null)
        }
        style={{
          width: '94%',
          padding: 10,
          borderRadius: 6,
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
}