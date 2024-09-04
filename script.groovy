#!/usr/bin/env groovy

def versionIncrement() {
    echo "Incrementing the app version"

    // Read the current version from package.json
    def packageJson = readJSON file: 'package.json'
    def currentVersion = packageJson.version

    // Parse the version components
    def (major, minor, patch) = currentVersion.tokenize('.')

    // Increment the patch version
    def newPatch = patch.toInteger() + 1
    def newVersion = "${major}.${minor}.${newPatch}"

    // Update package.json with the new version
    sh "npm version ${newVersion} --no-git-tag-version"

    echo "New Image Version Tag is ${newVersion} and ${BUILD_NUMBER}"

    // Return the new version tag combined with the build number
    return "${newVersion}-${BUILD_NUMBER}"
}


def deploy() {
    echo "Deploying the app to EC2 instance"

    def dockerCommand = """
        docker run -d \
        -p 3000:3000 \
        -e PORT=3000 \
        -e HOSTNAME="0.0.0.0" \
        -e NEXT_PUBLIC_API_BASE_URL="http://13.200.12.74:5000" \
        -e NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_51PNooyAlVX7wDzWhXJx2NQcNyms07M5HIe2AzhB8ytmaEzGadkLa7FWV9vQSWGfwJFHf0dOuSAud2PQcRi8MbXNy00Tv4DYFif" \
        chamikajay/room-rover-frontend:${env.IMAGE_TAG}
    """

    sshagent(['aws-ec2-ssh']) {
        sh "ssh -o StrictHostKeyChecking=no ec2-user@13.200.12.74 '${dockerCommand}'"
    }
}

def commitVersionUpdate() {
    sshagent(['jenkins-github-ssh']) {
        sh 'git config user.email "jenkins@ci-cd.com"'
        sh 'git config user.name "Jenkins User"'
        sh "git remote set-url origin git@github.com:Chamikajaya/room-rover-frontend.git"
        sh "git add ."
        sh 'git commit -m "Jenkins Version Bump"'
        sh 'git push origin HEAD:main'
    }
}

return this