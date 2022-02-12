<div align="center">
  
# Difference Calculator
</div>

### Hexlet tests and linter status:
[![Actions Status](https://github.com/gedo19/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/gedo19/backend-project-lvl2/actions)
[![Node.js CI](https://github.com/gedo19/backend-project-lvl2/actions/workflows/node.js.yml/badge.svg)](https://github.com/gedo19/backend-project-lvl2/actions/workflows/node.js.yml)
### Codeclimate:
[![Maintainability](https://api.codeclimate.com/v1/badges/25b37640f9434b2f4897/maintainability)](https://codeclimate.com/github/gedo19/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/25b37640f9434b2f4897/test_coverage)](https://codeclimate.com/github/gedo19/backend-project-lvl2/test_coverage)

## Desctiption
A console utility that compares two configuration files and shows a difference.

Supports only **json** and **yaml** files.

## Requirements
node v14+

## Install
1. `git clone https://github.com/gedo19/backend-project-lvl2.git`
2. `cd backend-project-lvl2/`
3. `make install`
4. `npm link`

## Usage
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
 ```
 
 Formatters available so far:
- stylish (default)
- plain
- json

## Preview
### Works with json and yaml files
#### before.json
```javascript
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
#### after.json
```javascript
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
#### json diff
[![asciicast](https://asciinema.org/a/455601.svg)](https://asciinema.org/a/455601)

#### before.yaml
```yaml
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
```
#### after.yaml
```yaml
timeout: 20
verbose: true
host: hexlet.io
```
#### yaml diff
[![asciicast](https://asciinema.org/a/455602.svg)](https://asciinema.org/a/455602)

### Formatters
#### before.json
```javascript
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```
#### after.json
```javascript
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}
```
#### Stylish formatter
[![asciicast](https://asciinema.org/a/455607.svg)](https://asciinema.org/a/455607)
#### Plain formatter
[![asciicast](https://asciinema.org/a/455606.svg)](https://asciinema.org/a/455606)
#### JSON formatter
[![asciicast](https://asciinema.org/a/456631.svg)](https://asciinema.org/a/456631)
