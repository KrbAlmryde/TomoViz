#!/bin/bash
#================================================================================
#    Program Name: RunTomoViz.sh
#          Author: Kyle Reese Almryde
#            Date: 11/18/2016
#
#     Description: This script deploys an instance of the TomoViz application
#                  Diables Apache
#                  It updates the TomoViz/Visualizer repository
#                  Restarts Apache
#                  and runs the necessary config and laucher commands to initiate
#                  the TomoViz program
#
#                  This program should reside in the home directory
#
#    Deficiencies: None. This program meets specification
#
#================================================================================
#                            FUNCTION DEFINITIONS
#================================================================================


function MAIN() {
    #------------------------------------------------------------------------
    #
    #  Purpose: Main entry point into program
    #
    #------------------------------------------------------------------------

    # SETUP OUR DIRECTORY POINTERS
    local HOME_DIR="/home/ssingh79"
    local REMOTEGL="${HOME_DIR}/RemoteGL"
    local APACHE="${HOME_DIR}/Apache-2.4.9/bin"
    local TOMOVIZ="${REMOTEGL}/visualizer"
    local PARAVIEW="${REMOTEGL}/ParaView"
    local PARAVIEWWEB="${PARAVIEW}/lib/python2.7/site-packages/vtk/web"

    # Stop Apache server
    ${APACHE}/apachectl -k stop

    # Change directories to Visualizer
    cd ${TOMOVIZ}

    # pull latest version
    git pull

    # update the build file
    if [[ $(npm run build) -gt 0 ]]; then
        echo "critial failure, something done broked yo"
        exit 1
    fi

    # Start Apache server
    ${APACHE}/apachectl -k start

    # Set the display stuffs
    export DISPLAY=:0.0

    # Now for the magic
    ${PARAVIEW}/bin/pvpython ${PARAVIEWWEB}/launcher.py ${TOMOVIZ}/launcher.config



} # End of MAIN

#================================================================================
#                                START OF MAIN
#================================================================================
MAIN
