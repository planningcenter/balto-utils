import * as core from '@actions/core'
import {exec, getExecOutput} from '@actions/exec'
import path from 'path'

async function run() {
  try {
    core.startGroup('Setup')

    if (process.env.GITHUB_REF_TYPE !== "branch") {
      throw "Ref type was not a branch, skipping workflow"
    }
    const branch = process.env.GITHUB_REF_NAME

    await exec('git', ['config', '--local', 'user.name', 'GitHub Action'])
    await exec('git', ['config', '--local', 'user.email', 'action@github.com'])

    core.info(`Starting working directory: ${process.cwd()}`)

    const customWorkingDir = core.getInput('directory')
    if (customWorkingDir) {
      const fullWorkingDir = path.resolve(customWorkingDir)
      core.info(`Changing directory to: ${fullWorkingDir}`)
      process.chdir(fullWorkingDir)
    }

    core.endGroup()
    core.startGroup('Compile')

    await exec('npx', ['@vercel/ncc', 'build'])

    core.endGroup()
    core.startGroup('Commit and Push')

    const commitMessage = `Automated build of ${process.env.GITHUB_SHA}`

    await exec('git', ['add', 'dist/index.js'])
    const {exitCode, stdout} = await getExecOutput('git', ['commit', '-m', commitMessage], {ignoreReturnCode: true})
    if (exitCode > 0) {
      if (stdout.includes('nothing to commit, working tree clean')) {
        return core.info('Nothing to commit')
      } else {
        throw "Git commit had unknown failure"
      }
    }
    core.info('Attempting to push commit')
    await exec('git', ['push', 'origin', `HEAD:${branch}`])
    core.info('Compiled and pushed successfully!')

    core.endGroup()

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`ncc failed! ${error.message}`)
    } else {
      core.setFailed('ncc failed! Unable to read error.')
    }
  }
}

run()
