import config from '../config'

/**
 * Log info message if verbose mode is enabled
 * @param {...any} args - Arguments to log
 */
function info() {
  if (config.verbose) {
    console.info.apply(undefined, arguments)
  }
}

/**
 * Log warning message if verbose mode is enabled
 * @param {...any} args - Arguments to log
 */
function warn() {
  if (config.verbose) {
    console.warn.apply(undefined, arguments)
  }
}

/**
 * Log error message (always logs regardless of verbose mode)
 * @param {...any} args - Arguments to log
 */
function error() {
  console.error.apply(undefined, arguments)
}

export default {
  info,
  warn,
  error,
}
