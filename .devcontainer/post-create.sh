#!/bin/bash
# Configure Artifactory registry for @ankorstore packages
npm config set @ankorstore:registry https://ankorstore.jfrog.io/artifactory/api/npm/npm-virtual/

# Install dependencies
npm install

echo "Ready! Run: npm run dev"
