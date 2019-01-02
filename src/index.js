#!/usr/bin/env node
import program from 'commander'
import {
  addInitCommand,
  addWatchCommand,
  addServeCommand,
  addPackCommand,
} from './commands'
;(async function() {
  addInitCommand(program)
  addPackCommand(program)
  addWatchCommand(program)
  addServeCommand(program)
  program.parse(process.argv)
})()
