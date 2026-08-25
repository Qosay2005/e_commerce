import React from "react";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";

export default function Contact() {
  return (
    <section className="min-h-screen bg-white px-4 py-10 dark:bg-[#121212] sm:px-6 lg:px-8 flex justify-items-center">

      <div className="mx-auto max-w-5xl">

        
        <div className="mb-8">
          <Typography
            variant="h4"
            className="font-bold text-slate-900 dark:!text-white"
          >
            Contact Us
          </Typography>

          <Typography
            variant="body2"
            className="mt-2 text-slate-500 dark:!text-gray-300"
          >
            We'd love to hear from you. Send us a message!
          </Typography>
        </div>

     
        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:!bg-[#1e1e1e] sm:p-8">

          <form className="space-y-5">

           
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter your name"
              size="small"
              variant="outlined"
            />

           
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter your email"
              size="small"
              variant="outlined"
            />

           
            <TextField
              fullWidth
              label="Phone (optional)"
              type="tel"
              placeholder="Enter your phone number"
              size="small"
              variant="outlined"
            />

            
            <TextField
              fullWidth
              label="Message"
              placeholder="Write your message..."
              multiline
              rows={5}
              variant="outlined"
            />

          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!mt-2 !py-3 !font-semibold"
              sx={{
                backgroundColor: "#D94343",

                "&:hover": {
                  backgroundColor: "#C93636",
                },
              }}
            >
              Send Message
            </Button>

          </form>

        </div>
      </div>
    </section>
  );
}