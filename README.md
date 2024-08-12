# Wesome to the Boggle Back End!

This is a very simple backend, just used for tracking and display scores.
Nothing fancy.

It is important to note, that the free tier for this deployment doesn't allow access to environment variables at build time (only runtime access), so in order to run database migrations, they must be done via the PSQL console with SQL directly on the database.
