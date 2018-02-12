Yarden Ne'eman
Web Science Lab 3
2/15/18

Link to individual repository: https://github.com/neemay/ITWS4500-Coursework
Link to project repository: https://github.com/jonesc11/mueller-center-class-signups
Link to bugzilla on the production server: http://ec2-34-239-101-4.compute-1.amazonaws.com/bugzilla/

In the project folder are the screenshots for the local configuration and server installations for the bug tracking software Bugzilla.
The bugzilla installation on the server can also be found in the last link above.
The server being used for this project is a free EC2 AWS server so that the development team can all work in the same environment instead of on each
individual local machine.
For access to the production server beyond a link, SSH keys should be sent to Collin Jones (jonesc11@rpi.edu)

Bugtracking software is important for every member of the development team to be aware of issues and keep track of lingering issues. Having them in a centralized
location in an organized way makes it less likely that known bugs will be forgotten about. That being said, it was very difficult to install Bugzilla on a Windows machine
because there was less support for it. On the server, it was simpler to install since it is Linux based. Keeping track of bugs on our server where all members will see
the same bugs will help the team in the development process.

For development itself, using Github will allow the team to develop in parallel without interfering with each other. It will also serve as version control for the team in
case any changes need to be reverted. It will also allow for development branches to stay separated from the production branch to ensure that nothing that is complete and
deployed is interfered with.