import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Button,
  Modal,
  TextField,
  Badge,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const UserModule = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Company A",
      lastCommunications: [
        { type: "LinkedIn Post", date: "5th September", notes: "Initial outreach" },
        { type: "Email", date: "10th September", notes: "Follow-up" },
        { type: "Phone Call", date: "15th September", notes: "Reminder" },
        { type: "LinkedIn Message", date: "20th September", notes: "Ping" },
        { type: "Email", date: "25th September", notes: "Follow-up" },
      ],
      nextCommunication: { type: "Email", date: "30th September" },
      overdue: false,
      dueToday: false,
    },
    // Add more companies here
  ]);
  
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationModalOpen, setCommunicationModalOpen] = useState(false);
  const [communicationType, setCommunicationType] = useState("");
  const [communicationDate, setCommunicationDate] = useState("");
  const [communicationNotes, setCommunicationNotes] = useState("");
  const [overdueCount, setOverdueCount] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);

  const handleCompanySelection = (companyId) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  const handleCommunicationModalOpen = () => {
    setCommunicationModalOpen(true);
  };

  const handleCommunicationModalClose = () => {
    setCommunicationModalOpen(false);
  };

  const handleCommunicationSubmit = () => {
    // Add new communication to the selected companies
    const updatedCompanies = companies.map((company) => {
      if (selectedCompanies.includes(company.id)) {
        company.lastCommunications.push({
          type: communicationType,
          date: communicationDate,
          notes: communicationNotes,
        });

        // Reset overdue and dueToday flags
        company.overdue = false;
        company.dueToday = false;
      }
      return company;
    });

    setCompanies(updatedCompanies);

    // After submitting, recalculate overdue and due today status for all companies
    updateOverdueAndDueToday();

    setCommunicationModalOpen(false);
    setCommunicationType("");
    setCommunicationDate("");
    setCommunicationNotes("");
  };

  const updateOverdueAndDueToday = () => {
    let overdue = 0;
    let dueToday = 0;

    // Iterate over companies to check overdue and due today statuses
    companies.forEach((company) => {
      const lastCommunication = company.lastCommunications[company.lastCommunications.length - 1];
      const today = new Date();
      const nextCommunicationDate = new Date(company.nextCommunication.date);

      // Check for overdue and due today
      if (nextCommunicationDate < today) {
        company.overdue = true;
        overdue++;
      } else if (nextCommunicationDate.toDateString() === today.toDateString()) {
        company.dueToday = true;
        dueToday++;
      }
    });

    setOverdueCount(overdue);
    setDueTodayCount(dueToday);
  };

  const getHighlightColor = (company) => {
    if (company.overdue) return "red";
    if (company.dueToday) return "yellow";
    return "transparent";
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IconButton onClick={updateOverdueAndDueToday}>
            <NotificationsIcon />
            <Badge badgeContent={overdueCount + dueTodayCount} color="error" />
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Last Five Communications</TableCell>
              <TableCell>Next Scheduled Communication</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id} style={{ backgroundColor: getHighlightColor(company) }}>
                <TableCell>
                  <input
                    type="checkbox"
                    onChange={() => handleCompanySelection(company.id)}
                    checked={selectedCompanies.includes(company.id)}
                  />
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {company.lastCommunications.map((comm, index) => (
                    <Tooltip title={comm.notes} key={index}>
                      <div>{comm.type} - {comm.date}</div>
                    </Tooltip>
                  ))}
                </TableCell>
                <TableCell>
                  {company.nextCommunication.type} - {company.nextCommunication.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" onClick={handleCommunicationModalOpen}>
        Communication Performed
      </Button>

      <Modal open={communicationModalOpen} onClose={handleCommunicationModalClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "400px",
          }}
        >
          <Typography variant="h6">Log Communication</Typography>
          <TextField
            fullWidth
            label="Communication Type"
            value={communicationType}
            onChange={(e) => setCommunicationType(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Communication Date"
            type="date"
            value={communicationDate}
            onChange={(e) => setCommunicationDate(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Notes"
            value={communicationNotes}
            onChange={(e) => setCommunicationNotes(e.target.value)}
            margin="normal"
          />
          <Box style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommunicationSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <div>
        <h3>Notifications</h3>
        <div>
          <h4>Overdue Communications</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {companies
                  .filter((company) => company.overdue)
                  .map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <h4>Today's Communications</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {companies
                  .filter((company) => company.dueToday)
                  .map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default UserModule;
