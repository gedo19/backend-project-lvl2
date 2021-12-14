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
A console utility that calculates the differences between json and yaml files.
The packege provides export gendiff function.

## Requirements
node v14+

## Install
1. `git clone https://github.com/gedo19/backend-project-lvl2.git`
2. `cd backend-project-lvl2/`
3. `make install`
4. `npm link`

## Usage
#### As a console utility:
`gendiff -h for help`
#### As package
```javascript
import genDiff from '@hexlet/code';
gendiff(filepath1, filepath2, [formatName]);
```

## Prewiev
### Plain json and yaml files
#### before.json
```js
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
#### after.json
```js
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
#### JSON diff
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

### Nested json files
#### before.json
```js
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
```js
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
[![asciicast](https://asciinema.org/a/455608.svg)](https://asciinema.org/a/455608)
