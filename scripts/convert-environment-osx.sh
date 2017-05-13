#!/bin/bash
if [ $# -eq 0 ]
then
    echo "Use \$npm run env -- development, \$npm run env -- staging or \$npm run env -- production"
    exit
else
    case "$1" in
        production)
            echo "Converting app to production mode"
            echo "Do not forget to convert it back to developemnt mode before commiting"
            find . -type f -name '*.ts' -exec sed -i "" "s|environment-development|environment-production|" {} +
            find . -type f -name '*.ts' -exec sed -i "" "s|environment-staging|environment-production|" {} +
            ;;
        staging)
            echo "Converting app to staging mode"
            echo "Do not forget to convert it back to developemnt mode before commiting"
            find . -type f -name '*.ts' -exec sed -i "" "s|environment-development|environment-staging|" {} +
            find . -type f -name '*.ts' -exec sed -i "" "s|environment-production|environment-staging|" {} +
            ;;
        development)
            echo "Converting app to development mode"
            find . -type f -name '*.ts' -exec sed -i "" "s|environment-production|environment-development|" {} +
            find . -type f -name '*.ts' -exec sed -i "" "s|environment-staging|environment-development|" {} +
            ;;
    esac
fi
