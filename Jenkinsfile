pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Student Attendance System...'
                checkout scm
            }
        }

        stage('Backend Install') {
            steps {
                echo 'Installing backend dependencies...'
                bat 'cd backend && npm ci'
            }
        }

        stage('Backend Test') {
            steps {
                echo 'Running backend tests...'
                bat '''
                    cd backend
                    node -e "const p=require('./package.json'); if(p.scripts && p.scripts.test){process.exit(require('child_process').spawnSync('npm',['test'],{stdio:'inherit',shell:true}).status || 0)} else {console.log('No backend test script configured - skipping tests')}"
                '''
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
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD pipeline failed. Check the console output.'
        }
    }
}