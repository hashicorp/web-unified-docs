myDir=$(pwd)

dirList=$(ls -d */)
skipList=("index.mdx" "enable.mdx")

echo ""
echo "myDir: ${myDir}"
echo "Parent directory list:"
echo "${dirList[@]}"
echo ""

for dir in ${dirList[@]} ; do

  targetDir="${myDir}/${dir}"

  echo "Processing ${targetDir}"
  echo ""

  for file in $(ls "${targetDir}"); do
  
    skipFile=$(echo ${skipList[@]} | grep "${file}")
    filePath="${targetDir}${file}"

    if [[ ! -z "${skipFile}" ]] ; then 
      
      echo "  !! Skipping file:      ${filePath}"

    elif [[ -f "${targetDir}/${file}" ]] ; then 

      newDir="${filePath/'.mdx'/''}"
      newFile="${newDir}/index.mdx"
      echo "  Converting file:      ${file}"
      echo "    - Current path:     ${filePath}"
      echo "    - New directory:    ${newDir}"
      echo "    - New file:         ${newFile}"
      mkdir "${newDir}"
      mkdir "${newDir}/api"
      touch "${newDir}/release-notes.mdx"
      mv "${filePath}" "${newFile}"
    
    else
      echo "  !! Skipping directory: ${file}"
    fi
  
  done

  echo ""

done