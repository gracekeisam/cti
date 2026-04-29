import { createContext, useContext, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const TableContext = createContext(null);

export function TableProvider({ children }) {
  const { tableId: paramTableId } = useParams();
  const [searchParams] = useSearchParams();
  const queryTable = searchParams.get('table');

  // Priority: route param > query string > default 1
  const tableNumber = useMemo(() => {
    if (paramTableId) return Number(paramTableId);
    if (queryTable) return Number(queryTable);
    return 1;
  }, [paramTableId, queryTable]);

  return (
    <TableContext.Provider value={{ tableNumber }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTable must be used within a TableProvider');
  return ctx;
}
