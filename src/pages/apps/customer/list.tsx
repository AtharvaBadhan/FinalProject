import { useCallback, useEffect, useMemo, useState, FC, Fragment, MouseEvent } from 'react';
import Chance from 'chance';
// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';
import {
  useFilters,
  useExpanded,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
  usePagination,
  Column,
  HeaderGroup,
  Row,
  Cell,
  HeaderProps
} from 'react-table';

// project-imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import AddVehicle from 'sections/apps/customer/AddVehicle';
import VehicleView from 'sections/apps/customer/CustomerView';
import AlertVehicleDelete from 'sections/apps/customer/AlertVehicleDelete';

import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { Add, Edit, Eye, Trash } from 'iconsax-react';

// types
import { ThemeMode } from 'types/config';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  handleAdd: () => void;
  renderRowSubComponent: FC<any>;
}

function ReactTable({ columns, data, renderRowSubComponent, handleAdd }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'memberId', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(['age', 'contact', 'visits', 'email', 'status', 'avatar']);
    } else {
      setHiddenColumns(['avatar', 'email']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={2}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button variant="contained" startIcon={<Add />} onClick={handleAdd} size="small">
              Add Vehicle
            </Button>
            <CSVExport
              data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d: Row) => d.original) : data}
              filename={'vehicle-list.csv'}
            />
          </Stack>
        </Stack>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column: HeaderGroup) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: Row, i: number) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell: Cell) => (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

// ==============================|| CUSTOMER - LIST ||============================== //

const VehicleListPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const data = useMemo(() => makeData(200), []);
  const [open, setOpen] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [vehicleDeleteId, setVehicleDeleteId] = useState<any>('');
  const [add, setAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setAdd(!add);
    if (vehicle && !add) setVehicle(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };
  const chance = new Chance();
  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: ({ getToggleAllPageRowsSelectedProps }: HeaderProps<{}>) => (
          <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
        ),
        accessor: 'selection',
        Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        disableSortBy: true
      },
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'Vehicle',
        accessor: 'memberId',
        Cell: ({ row }: { row: Row }) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${!values.avatar ? 1 : values.avatar}.png`)} />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.vehicle}</Typography>
                <Typography color="text.secondary">{values.email}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        Cell: () => (
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Use chance.company() to generate a random brand name */}
            <Typography variant="subtitle1">{chance.company()}</Typography>
          </Stack>
        )
        },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Model',
        accessor: 'model',
        disableSortBy: true
      },
      {
        Header: 'Contact',
        accessor: 'contact',
        Cell: ({ value }: { value: number }) => (
          <Stack direction="row" spacing={2} alignItems="center">
          <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={value} />
          </Stack>
         )
      },
      {
        Header: 'Variant',
        accessor: 'variant',
        className: 'cell-right'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Vehicle No',
        accessor: 'vehicleNo'
      },
      {
        title: 'EPC Tag',
        Header: 'EPC Tag',
        accessor: 'epcTag',
        Cell: ({ value } : {value: string}) => <span>{chance.string()}</span>, // Generate random string for EPC Tag column
        disableSortBy: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: { row: Row<{}> }) => {
          const collapseIcon = row.isExpanded ? <Add style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} /> : <Eye />;
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="View"
              >
                <IconButton
                  color="secondary"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    row.toggleRowExpanded();
                  }}
                >
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="Edit"
              >
                <IconButton
                  color="primary"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setVehicle(row.values);
                    handleAdd();
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="Delete"
              >
                <IconButton
                  color="error"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleClose();
                    setVehicleDeleteId(row.values.id);
                  }}
                >
                  <Trash />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }: { row: Row<{}> }) => <VehicleView data={data[Number(row.id)]} />, [data]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} handleAdd={handleAdd} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
      <AlertVehicleDelete title={vehicleDeleteId} open={open} handleClose={handleClose} />
      {/* add vehicle dialog */}
      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <AddVehicle vehicle={vehicle} onCancel={handleAdd} />
      </Dialog>
    </MainCard>
  );
};

export default VehicleListPage;
