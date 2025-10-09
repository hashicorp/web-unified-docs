# Expected usage: push-to-rc-docs.sh <productKey> <gaFolder> <rcFolder> <safeListFile>
# Example:        push-to-rc-docs.sh vault '1.20.x' '1.21.x (rc)' '../output/safe-list.txt'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
productKey="${1}"  # root folder for product docs (product key)
gaFolder="${2}"    # GA doc folder name
rcFolder="${3}"    # RC doc folder name
safeList="${4}"    # file of GA paths we can overwrite in RC

# Bail if any of the command line parameters were omitted
if [[ -z "${productKey}" ]] ; then exit ; fi
if [[ -z "${gaFolder}" ]]   ; then exit ; fi
if [[ -z "${rcFolder}" ]]   ; then exit ; fi
if [[ -z "${safeList}" ]]   ; then exit ; fi

cd "${repoRoot}"

while read line; do

  gaPath=$(echo "$line" | awk -F " " '{print $3}')
  rcPath=${gaPath/${gaFolder}/${rcFolder}}

  # Skip any file that may have ended up in the list from a different product
  if [[ "${gaPath}" != *"/content/${productKey}/"* ]]; then continue ; fi
  if [[ "${rcPath}" != *"/content/${productKey}/"* ]]; then continue ; fi
  cp -r "${gaPath}" "${rcPath}"

done < "${safeList}"
