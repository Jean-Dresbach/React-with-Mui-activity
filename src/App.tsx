import axios from "axios"
import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography
} from "@mui/material"

import "./styles/global.css"

interface Person {
  createdAt: string
  name: string
  avatar: string
  last_name: string
  phone: string
  id: number
}

export function App() {
  const [data, setData] = useState<Person[]>([])
  const [open, setOpen] = useState(false)
  const [indexPerson, setIndexPerson] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://6495dc81b08e17c91792c92d.mockapi.io/api/v1/people"
        )
        console.log(response.data)

        setData(response.data)
      } catch (error) {
        console.log("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, [])

  const handleOpen = (index: number) => {
    setIndexPerson(index)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <Grid container margin={0} maxWidth={1380} spacing={2}>
        {data.map((person, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            md={4}
            paddingRight={2}
            paddingBottom={2}
            key={person.id}
            display={"flex"}
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ width: 300, height: "100%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={person.avatar}
                title={person.name}
              />
              <CardContent>
                <Typography variant="h5">
                  {person.name + " " + person.last_name}
                </Typography>
              </CardContent>
              <CardActions sx={{ padding: "16px" }}>
                <Button
                  onClick={() => handleOpen(index)}
                  size="small"
                  variant="outlined"
                >
                  Show More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 400,
            height: 400,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          {data[indexPerson] && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                id: {data[indexPerson].id}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Phone Number: {data[indexPerson].phone}
              </Typography>
            </>
          )}
          <Button onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </Box>
  )
}
