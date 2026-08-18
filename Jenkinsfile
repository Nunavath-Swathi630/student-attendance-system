pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Student Attendance System...'
            }
        }

        stage('Backend Install') {
            steps {
                echo 'Installing backend dependencies...'
                bat 'cd backend && npm ci'
            }
        }

        stage('Backend Validation') {
            steps {
                echo 'Validating backend JavaScript...'
                bat 'cd backend && node --check server.js'
            }
        }

        stage('Frontend Install') {
            steps {
                echo 'Installing frontend dependencies...'
                bat 'cd frontend && npm ci'
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Building React frontend...'
                bat 'cd frontend && npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                bat 'docker compose build'
            }
        }

        stage('Docker Deploy') {
            steps {
                echo 'Deploying Student Attendance System...'
                bat 'docker compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                echo 'Checking backend health...'
                bat 'powershell -NoProfile -Command "Start-Sleep -Seconds 5; $r=Invoke-WebRequest http://localhost:5000/api/health -UseBasicParsing; if ($r.StatusCode -ne 200) { exit 1 }; Write-Host $r.Content"'
            }
        }
    }

    post {
        success {
            echo '========================================='
            echo 'CI/CD PIPELINE COMPLETED SUCCESSFULLY!'
            echo '========================================='
        }

        failure {
            echo 'CI/CD pipeline failed. Check the console output.'
        }
    }
}